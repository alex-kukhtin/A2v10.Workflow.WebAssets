import variablesProps from './parts/VariablesProps';
import globalProps from './parts/GlobalProps';
import detailsProps from './parts/DetailsProps';
import conditionalProps from './parts/CondtionalProps';
import multiInstanceProps from './parts/MultiInstanceProps';

import { ListGroup, Group } from '@bpmn-io/properties-panel';

import { isAny } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 500;

export default function WorkflowPropertiesProvider(propertiesPanel, injector, translate) {

    this.getGroups = (element) => {
        return function (groups) {
            let set = false;
            if (isAny(element, ['bpmn:Process', 'bpmn:Collaboration'])) {
                groups.push(createGlobalGroup(element, injector, translate));
                set = true;
            }

            if (isAny(element, ['bpmn:Process', 'bpmn:SubProcess', 'bpmn:Collaboration', 'bpmn:Participant'])) {
                groups.push(createVariablesGroup(element, injector, translate));
                set = true;
            }
            if (!set) {
                let details = createDetailsGroup(element, injector, translate);
                if (details)
                    groups.push(details);
                let conditional = createConditionalGroup(element, injector, translate);
                if (conditional)
					groups.push(conditional);
            }

            let mi = groups.find(g => g.id === "multiInstance");
            if (mi) {
                // delete std: Loop Cardinality and Loop Condition   
                let np = multiInstanceProps(element, injector, translate);
                mi.entries.splice(0);
				mi.entries.push(...np);
            }

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

function createGlobalGroup(element, injector, translate) {
    const entries = [...globalProps({ element, injector })];
    const globalGroup = {
        id: 'global',
        label: translate('Global Script'),
        entries,
        component: Group
    };

    return globalGroup;
}

function createDetailsGroup(element, injector, translate) {
    const entries = [...detailsProps({ element, injector})];
    if (!entries.length)
        return null;
    return {
        id: 'details',
        label: translate('Details'),
        entries,
        component: Group
    };
}

function createConditionalGroup(element, injector, translate) {
    const entries = [...conditionalProps({ element, injector })];
    if (!entries.length)
        return null;
    return {
        id: 'conditional',
        label: translate('Condition'),
        entries,
        component: Group
    };
}
