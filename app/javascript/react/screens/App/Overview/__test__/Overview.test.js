import React from 'react';
import { shallow } from 'enzyme';
import Overview from '../Overview';
import { coreComponents } from '../../../../../components';
import componentRegistry from '../../../../../components/componentRegistry';
import { transformationMappings } from '../overview.fixtures';

jest.mock('../../../../../components/componentRegistry');
jest.useFakeTimers();

componentRegistry.registerMultiple(coreComponents);

describe('Overview component', () => {
  const baseProps = {
    store: {},
    mappingWizardVisible: false,
    planWizardVisible: false,
    isFetchingTransformationMappings: false,
    isRejectedTransformationMappings: false,
    transformationMappings: [],
    transformationPlans: [],
    clusters: [],
    fetchTransformationPlansUrl: '',
    fetchServiceTemplateAnsiblePlaybooksUrl: '',
    archivedTransformationPlans: []
  };
  let showMappingWizardAction;
  let showPlanWizardAction;
  let fetchProvidersAction;
  let fetchTransformationMappingsAction;
  let fetchTransformationPlansAction;
  let fetchServiceTemplateAnsiblePlaybooksAction;
  let fetchClustersAction;
  let fetchNetworksAction;
  let fetchDatastoresAction;
  let fetchCloudTenantsAction;
  let fetchCloudNetworksAction;
  let fetchCloudVolumeTypesAction;
  beforeEach(() => {
    showMappingWizardAction = jest.fn();
    showPlanWizardAction = jest.fn();
    fetchProvidersAction = jest.fn();
    fetchTransformationMappingsAction = jest.fn();
    fetchTransformationPlansAction = jest.fn();
    fetchServiceTemplateAnsiblePlaybooksAction = jest.fn();
    fetchClustersAction = jest.fn();
    fetchNetworksAction = jest.fn();
    fetchDatastoresAction = jest.fn();
    fetchCloudTenantsAction = jest.fn();
    fetchCloudNetworksAction = jest.fn();
    fetchCloudVolumeTypesAction = jest.fn();
    fetchTransformationPlansAction.mockReturnValue(Promise.resolve());
    fetchServiceTemplateAnsiblePlaybooksAction.mockReturnValue(Promise.resolve());
  });

  describe('overview sections', () => {
    test('does not render Migrations if there are no transformation mappings', () => {
      const wrapper = shallow(
        <Overview
          {...baseProps}
          showMappingWizardAction={showMappingWizardAction}
          showPlanWizardAction={showPlanWizardAction}
          fetchProvidersAction={fetchProvidersAction}
          fetchTransformationMappingsAction={fetchTransformationMappingsAction}
          fetchTransformationPlansAction={fetchTransformationPlansAction}
          fetchServiceTemplateAnsiblePlaybooksAction={fetchServiceTemplateAnsiblePlaybooksAction}
          fetchClustersAction={fetchClustersAction}
          fetchDatastoresAction={fetchDatastoresAction}
          fetchNetworksAction={fetchNetworksAction}
          fetchCloudTenantsAction={fetchCloudTenantsAction}
          fetchCloudNetworksAction={fetchCloudNetworksAction}
          fetchCloudVolumeTypesAction={fetchCloudVolumeTypesAction}
        />
      );

      expect(wrapper.find('Migrations').exists()).toBe(false);
    });

    test('renders Migrations if there are transformation mappings', () => {
      const wrapper = shallow(
        <Overview
          {...baseProps}
          transformationMappings={transformationMappings}
          showMappingWizardAction={showMappingWizardAction}
          showPlanWizardAction={showPlanWizardAction}
          fetchProvidersAction={fetchProvidersAction}
          fetchTransformationMappingsAction={fetchTransformationMappingsAction}
          fetchTransformationPlansAction={fetchTransformationPlansAction}
          fetchServiceTemplateAnsiblePlaybooksAction={fetchServiceTemplateAnsiblePlaybooksAction}
          fetchClustersAction={fetchClustersAction}
          fetchDatastoresAction={fetchDatastoresAction}
          fetchNetworksAction={fetchNetworksAction}
          fetchCloudTenantsAction={fetchCloudTenantsAction}
          fetchCloudNetworksAction={fetchCloudNetworksAction}
          fetchCloudVolumeTypesAction={fetchCloudVolumeTypesAction}
        />
      );

      expect(wrapper.find('Migrations').exists()).toBe(true);
    });
  });

  describe('polling', () => {
    let wrapper; // eslint-disable-line no-unused-vars
    beforeEach(() => {
      wrapper = shallow(
        <Overview
          {...baseProps}
          showMappingWizardAction={showMappingWizardAction}
          showPlanWizardAction={showPlanWizardAction}
          fetchProvidersAction={fetchProvidersAction}
          fetchTransformationMappingsAction={fetchTransformationMappingsAction}
          fetchTransformationPlansAction={fetchTransformationPlansAction}
          fetchServiceTemplateAnsiblePlaybooksAction={fetchServiceTemplateAnsiblePlaybooksAction}
          fetchClustersAction={fetchClustersAction}
          fetchDatastoresAction={fetchDatastoresAction}
          fetchNetworksAction={fetchNetworksAction}
          fetchCloudTenantsAction={fetchCloudTenantsAction}
          fetchCloudNetworksAction={fetchCloudNetworksAction}
          fetchCloudVolumeTypesAction={fetchCloudVolumeTypesAction}
        />
      );
    });
    test('starts when the component is mounted', () => {
      expect(fetchTransformationPlansAction).toHaveBeenCalled();
    });

    test('fetches transformation plan requests every 15 seconds', () => {
      jest.advanceTimersByTime(15000);
      expect(fetchTransformationPlansAction).toHaveBeenCalledTimes(3);
    });

    // TODO: Come back to these once the UI is closer to final form
    test.skip('stops if the mapping wizard is visible', () => {});

    test.skip('stops if the plan wizard is visible', () => {});
  });
});
