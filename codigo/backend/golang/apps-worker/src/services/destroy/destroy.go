package destroy

import (
  "climb/apps-deployer/utils"
  "context"
  "fmt"
  "github.com/traefik/traefik/v2/pkg/provider/kubernetes/crd/generated/clientset/versioned"
  metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
  "k8s.io/client-go/kubernetes"
  "k8s.io/client-go/tools/clientcmd"
  "path/filepath"
)

func Destroy(name string) (err error) {
  ctx := context.TODO()
  namespace := "default"
  kubeConfigPath, _ := filepath.Abs("kubernetes/config")

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

  traefikClientSet, err := versioned.NewForConfig(config)

  if err != nil {
    utils.LogError(err, "failed to create Traefik Client Set")
    return
  }

  coreV1Client := kubernetesClientSet.CoreV1()
  appsV1Client := kubernetesClientSet.AppsV1()
  traefikV1alpha1Client := traefikClientSet.TraefikV1alpha1()

  err = traefikV1alpha1Client.IngressRoutes(namespace).Delete(ctx, name, metaV1.DeleteOptions{})

  if err != nil {
    errorMessage := fmt.Sprintf("failed to delete Traefik Ingress Route %s", name)
    utils.LogError(err, errorMessage)
    return
  }

  fmt.Printf("Deleted Ingress Route %s\n", name)

  err = coreV1Client.Services(namespace).Delete(ctx, name, metaV1.DeleteOptions{})

  if err != nil {
    errorMessage := fmt.Sprintf("failed to delete Kubernetes Service %s", name)
    utils.LogError(err, errorMessage)
    return
  }

  fmt.Printf("Deleted Service %s\n", name)

  err = appsV1Client.Deployments(namespace).Delete(ctx, name, metaV1.DeleteOptions{})

  if err != nil {
    errorMessage := fmt.Sprintf("failed to delete Kubernetes Deployment %s", name)
    utils.LogError(err, errorMessage)
    return
  }

  fmt.Printf("Deleted Deployment %s\n", name)

  return
}
