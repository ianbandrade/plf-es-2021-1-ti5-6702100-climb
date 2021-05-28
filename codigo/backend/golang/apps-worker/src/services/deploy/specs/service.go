package specs

import (
	"github.com/docker/go-connections/nat"
	coreV1 "k8s.io/api/core/v1"
	metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/intstr"
)

func Service(name string, port nat.Port) *coreV1.Service {
	return &coreV1.Service{
		ObjectMeta: metaV1.ObjectMeta{
			Name: name,
		},
		Spec: coreV1.ServiceSpec{
			Selector: map[string]string{
				"app": name,
			},
			Ports: []coreV1.ServicePort{
				{
					Port: int32(port.Int()),
					TargetPort: intstr.IntOrString{
						Type:   intstr.Int,
						IntVal: int32(port.Int()),
					},
				},
			},
		},
	}
}
