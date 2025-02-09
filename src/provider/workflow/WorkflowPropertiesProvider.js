import variablesProps from './parts/VariablesProps';

import { ListGroup } from '@bpmn-io/properties-panel';

import { is, isAny } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

export default function WorkflowPropertiesProvider(propertiesPanel, injector, translate) {

    this.getGroups = function (element) {

        return function (groups) {

            if (!isAny(element, ['bpmn:Process', 'bpmn:SubProcess', 'bpmn:Collaboration', 'bpmn:Participant']))
                return groups;

            groups.push(createVariablesGroup(element, injector, translate));

            return groups;
        };
    };

    propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

WorkflowPropertiesProvider.$inject = ['propertiesPanel', 'injector', 'translate'];

function createVariablesGroup(element, injector, translate) {

    const variablesGroup = {
        id: 'variables',
        label: translate('Variables'),
        component: ListGroup,
        ...variablesProps({ element, injector })
    };

    return variablesGroup;
}
