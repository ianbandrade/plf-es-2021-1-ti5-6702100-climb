package destroy

import (
	"climb/plugins-worker/data"
	"climb/plugins-worker/utils"
	"context"
	"fmt"
	traefik "github.com/traefik/traefik/v2/pkg/provider/kubernetes/crd/generated/clientset/versioned"
	"helm.sh/helm/v3/pkg/action"
	metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"os"
	"path/filepath"
)

func Destroy(name, chartName string) (err error) {
	ctx := context.TODO()
	namespace := "default"
	plugin := data.Plugins[chartName]
	emptyLog := func(format string, v ...interface{}) {}

	kubeConfigPath, _ := filepath.Abs("kubernetes/config")

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

	kubernetesClientSet, err := kubernetes.NewForConfig(config)

	if err != nil {
		utils.LogError(err, "failed to create Kubernetes Client Set")
		return
	}

	uninstallClient := action.NewUninstall(actionConfig)
	coreV1Client := kubernetesClientSet.CoreV1()

	_, err = uninstallClient.Run(name)

	if err != nil {
		errorMessage := fmt.Sprintf("failed to delete Helm Chart %s", name)
		utils.LogError(err, errorMessage)
		return
	}

	fmt.Printf("Deleted Release %s\n", name)

	for _, storage := range plugin.Storages {
		pvcName := fmt.Sprintf(storage, name)
		err = coreV1Client.PersistentVolumeClaims(namespace).Delete(ctx, pvcName, metaV1.DeleteOptions{})

		if err != nil {
			errorMessage := fmt.Sprintf("failed to delete Kubernetes PersistentVolumeClaims %s", pvcName)
			utils.LogError(err, errorMessage)
			return
		}

		fmt.Printf("Deleted PersistentVolumeClaims %s\n", pvcName)
	}

	if plugin.WebPort != nil {
		traefikClientSet, err := traefik.NewForConfig(config)

		if err != nil {
			utils.LogError(err, "failed to create Traefik Client Set")
			return err
		}

		traefikV1alpha1Client := traefikClientSet.TraefikV1alpha1()

		err = traefikV1alpha1Client.IngressRoutes(namespace).Delete(ctx, name, metaV1.DeleteOptions{})

		if err != nil {
			errorMessage := fmt.Sprintf("failed to delete Traefik IngressRoute %s", name)
			utils.LogError(err, errorMessage)
			return err
		}

		fmt.Printf("Deleted IngressRoute %s\n", name)
	}

	return
}
