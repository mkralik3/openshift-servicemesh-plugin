import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { ServiceId } from 'types/ServiceId';
import { ServiceDetailsPage } from 'pages/ServiceDetails/ServiceDetailsPage';
import { setRouterBasename, useInitKialiListeners } from '../../utils/KialiIntegration';
import { KialiContainer } from 'openshift/components/KialiContainer';
import { configure } from 'mobx';

// Configure MobX to isolate different versions in OCP 4.15
configure({ isolateGlobalState: true });

const ServiceMeshTab: React.FC<void> = () => {
  useInitKialiListeners();

  const history = useHistory();
  setRouterBasename(history.location.pathname);

  const path = history.location.pathname.substring(8);
  const items = path.split('/');
  const namespace = items[0];
  const service = items[2];

  const serviceId: ServiceId = {
    namespace,
    service
  };

  return (
    <KialiContainer>
      <ServiceDetailsPage serviceId={serviceId}></ServiceDetailsPage>
    </KialiContainer>
  );
};

export default ServiceMeshTab;
