import {
  getGroupVersionKindForResource,
  K8sGroupVersionKind,
  K8sResourceCommon
} from '@openshift-console/dynamic-plugin-sdk';

export type IstioResourceType = K8sGroupVersionKind & {
  id: string;
  title?: string;
};

// List of Istio resources that the OpenShift Console watches for building the Istio Config page in a "native" way
export const istioResources: IstioResourceType[] = [
  {
    id: 'authorizationPolicy',
    group: 'security.istio.io',
    version: 'v1',
    kind: 'AuthorizationPolicy'
  },
  {
    id: 'destinationRule',
    group: 'networking.istio.io',
    version: 'v1',
    kind: 'DestinationRule'
  },
  {
    id: 'envoyFilter',
    group: 'networking.istio.io',
    version: 'v1alpha3',
    kind: 'EnvoyFilter'
  },
  {
    id: 'gateway',
    group: 'networking.istio.io',
    version: 'v1',
    kind: 'Gateway'
  },
  {
    id: 'k8sGateway',
    group: 'gateway.networking.k8s.io',
    version: 'v1',
    kind: 'Gateway',
    title: 'Gateway (K8s)'
  },
  {
    id: 'k8sGRPCRoute',
    group: 'gateway.networking.k8s.io',
    version: 'v1',
    kind: 'GRPCRoute',
    title: 'GRPCRoute (K8s)'
  },
  {
    id: 'k8sHTTPRoute',
    group: 'gateway.networking.k8s.io',
    version: 'v1',
    kind: 'HTTPRoute',
    title: 'HTTPRoute (K8s)'
  },
  {
    id: 'k8sReferenceGrant',
    group: 'gateway.networking.k8s.io',
    version: 'v1beta1',
    kind: 'ReferenceGrant',
    title: 'ReferenceGrant (K8s)'
  },
  {
    id: 'k8sTCProute',
    group: 'gateway.networking.k8s.io',
    version: 'v1alpha2',
    kind: 'TCPRoute',
    title: 'TCPRoute (K8s)'
  },
  {
    id: 'k8sTLSroute',
    group: 'gateway.networking.k8s.io',
    version: 'v1alpha2',
    kind: 'TLSRoute',
    title: 'TLSRoute (K8s)'
  },
  {
    id: 'peerAuthentication',
    group: 'security.istio.io',
    version: 'v1',
    kind: 'PeerAuthentication'
  },
  {
    id: 'proxyConfig',
    group: 'networking.istio.io',
    version: 'v1beta1',
    kind: 'ProxyConfig'
  },
  {
    id: 'requestAuthentication',
    group: 'security.istio.io',
    version: 'v1',
    kind: 'RequestAuthentication'
  },
  {
    id: 'serviceEntry',
    group: 'networking.istio.io',
    version: 'v1',
    kind: 'ServiceEntry'
  },
  {
    id: 'sidecar',
    group: 'networking.istio.io',
    version: 'v1',
    kind: 'Sidecar'
  },
  {
    id: 'telemetry',
    group: 'telemetry.istio.io',
    version: 'v1',
    kind: 'Telemetry'
  },
  {
    id: 'virtualService',
    group: 'networking.istio.io',
    version: 'v1',
    kind: 'VirtualService'
  },
  {
    id: 'workloadEntry',
    group: 'networking.istio.io',
    version: 'v1',
    kind: 'WorkloadEntry'
  },
  {
    id: 'workloadGroup',
    group: 'networking.istio.io',
    version: 'v1',
    kind: 'WorkloadGroup'
  },
  {
    id: 'wasmPlugin',
    group: 'extensions.istio.io',
    version: 'v1alpha1',
    kind: 'WasmPlugin'
  }
];

export type ResourceURLPathProps = {
  name: string;
  ns: string;
  plural: string;
};

export const referenceFor = (groupVersionKind: K8sGroupVersionKind): string => {
  return `${groupVersionKind.group}~${groupVersionKind.version}~${groupVersionKind.kind}`;
};

export const referenceForObj = (obj: K8sResourceCommon): string => {
  const groupVersionKind = getGroupVersionKindForResource(obj);
  return referenceFor(groupVersionKind);
};

// This helper would translate Istio Kiali format
// i.e. /istio/networking.istio.io/v1/DestinationRule/reviews
// Into the regular format used for resources in OpenShift
// i.e. /networking.istio.io~v1~DestinationRule/reviews
export const refForKialiIstio = (kialiIstioUrl: string): string => {
  const kialiIstioResource = kialiIstioUrl.split('/');

  const groupVersionKind = {
    group: kialiIstioResource[2],
    version: kialiIstioResource[3],
    kind: kialiIstioResource[4]
  };

  return `/${referenceFor(groupVersionKind)}/${kialiIstioResource[5]}`;
};
