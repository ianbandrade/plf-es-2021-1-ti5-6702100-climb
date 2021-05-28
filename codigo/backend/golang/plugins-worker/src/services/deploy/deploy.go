package deploy

import (
	"bytes"
	"climb/plugins-worker/data"
	"climb/plugins-worker/services/deploy/specs"
	"climb/plugins-worker/structs"
	"climb/plugins-worker/utils"
	"context"
	"fmt"
	"github.com/tidwall/gjson"
	"github.com/tidwall/sjson"
	traefik "github.com/traefik/traefik/v2/pkg/provider/kubernetes/crd/generated/clientset/versioned"
	"helm.sh/helm/v3/pkg/action"
	"helm.sh/helm/v3/pkg/chart/loader"
	metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/client-go/tools/clientcmd"
	"os"
	"path/filepath"
	"text/template"
)

type Credentials []structs.Credential

func Deploy(name, chartName string) (credentials Credentials, err error) {
	ctx := context.TODO()
	namespace := "default"
	plugin := data.Plugins[chartName]
	emptyLog := func(format string, v ...interface{}) {}

	kubeConfigPath, _ := filepath.Abs("kubernetes/config")
	chartPath, _ := filepath.Abs(fmt.Sprintf("charts/%s.tgz", chartName))

	kubeConfig := genericclioptions.NewConfigFlags(false)
	kubeConfig.KubeConfig = &kubeConfigPath
	kubeConfig.Namespace = &namespace

	actionConfig := new(action.Configuration)
	err = actionConfig.Init(kubeConfig, namespace, os.Getenv("HELM_DRIVER"), emptyLog)

	if err != nil {
		utils.LogError(err, "failed to create Helm Action Config")
		return
	}

	config, err := clientcmd.BuildConfigFromFlags("", kubeConfigPath)

	if err != nil {
		utils.LogError(err, "failed to create Kubernetes Rest Config")
		return
	}

	traefikClientSet, err := traefik.NewForConfig(config)

	if err != nil {
		utils.LogError(err, "failed to create Traefik Client Set")
		return
	}

	installClient := action.NewInstall(actionConfig)
	traefikV1alpha1Client := traefikClientSet.TraefikV1alpha1()

	installClient.Namespace = namespace
	installClient.ReleaseName = name

	chart, err := loader.Load(chartPath)

	if err != nil {
		errorMessage := fmt.Sprintf("failed to load Chart %s", chartName)
		utils.LogError(err, errorMessage)
		return
	}

	values, credentials := getDeployData(name, plugin.Protocol, plugin.Configs)

	_, err = installClient.Run(chart, values)

	if err != nil {
		errorMessage := fmt.Sprintf("failed to create Release %s", name)
		utils.LogError(err, errorMessage)
		return
	}

	fmt.Printf("Created Release %s\n", name)

	if plugin.WebPort != nil {
		ingressRouteSpec := specs.IngressRoute(name, *plugin.WebPort)

		ingressRoute, err := traefikV1alpha1Client.IngressRoutes(namespace).Create(ctx, ingressRouteSpec, metaV1.CreateOptions{})

		if err != nil {
			errorMessage := fmt.Sprintf("failed to create Traefik IngressRoute %s", name)
			utils.LogError(err, errorMessage)
			return nil, err
		}

		fmt.Printf("Created IngressRoute %s\n", ingressRoute.ObjectMeta.Name)
	}

	return
}

func getDeployData(host, protocol string, configs structs.Configs) (map[string]interface{}, Credentials) {
	valuesJSON := ""

	uriData := map[string]string{
		"host": host,
	}
	credentials := []structs.Credential{{
		Key:   "Domínio",
		Value: host,
	}}

	for configKey, configValue := range configs {
		value := utils.RandomString(configValue.Size)
		valuesJSON, _ = sjson.Set(valuesJSON, configValue.Path, value)

		uriData[configKey] = value
		credentials = append(credentials, structs.Credential{
			Key:   configValue.Label,
			Value: value,
		})
	}

	var buffer bytes.Buffer
	tmpl := template.Must(template.New("URI").Parse(utils.GetURI(protocol)))
	_ = tmpl.Execute(&buffer, uriData)
	uri := buffer.String()

	values := gjson.Parse(valuesJSON).Value().(map[string]interface{})
	credentials = append(credentials, structs.Credential{
		Key:   "URI",
		Value: uri,
	})

	return values, credentials
}
