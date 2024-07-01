import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { IstioConfigId } from 'types/IstioConfigDetails';
import { IstioConfigDetailsPage } from 'pages/IstioConfigDetails/IstioConfigDetailsPage';
import { setRouterBasename, useInitKialiListeners } from '../../utils/KialiIntegration';
import { KialiContainer } from 'openshift/components/KialiContainer';
import { configure } from 'mobx';

// Configure MobX to isolate different versions in OCP 4.15
configure({ isolateGlobalState: true });

const configTypes = {
  DestinationRule: 'DestinationRules',
  EnvoyFilter: 'EnvoyFilters',
  Gateway: 'Gateways',
  VirtualService: 'VirtualServices',
  ServiceEntry: 'ServiceEntries',
  Sidecar: 'Sidecars',
  WorkloadEntry: 'WorkloadEntries',
  WorkloadGroup: 'WorkloadGroups',
  AuthorizationPolicy: 'AuthorizationPolicies',
  PeerAuthentication: 'PeerAuthentications',
  RequestAuthentication: 'RequestAuthentications'
};

const IstioConfigMeshTab: React.FC<void> = () => {
  useInitKialiListeners();

  const history = useHistory();
  setRouterBasename(history.location.pathname);

  const path = history.location.pathname.substring(8);
  const items = path.split('/');
  const namespace = items[0];
  const objectType = configTypes[items[1].substring(items[1].lastIndexOf('~') + 1)].toLowerCase();
  const object = items[2];

  const istioConfigId: IstioConfigId = {
    namespace,
    objectType,
    object
  };

  return (
    <KialiContainer>
      <IstioConfigDetailsPage istioConfigId={istioConfigId}></IstioConfigDetailsPage>
    </KialiContainer>
  );
};

export default IstioConfigMeshTab;
