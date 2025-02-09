import Ids from 'ids';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export function getVariablesExtension(element) {
    const businessObject = getBusinessObject(element);
    return getExtension(businessObject, 'wf:Variables');
}

export function getVariables(element) {
    const variables = getVariablesExtension(element);
    return variables && variables.get('values');
}

export function getExtension(element, type) {
    if (!element.extensionElements) {
        return null;
    }

    return element.extensionElements.values.filter(function (e) {
        return e.$instanceOf(type);
    })[0];
}

export function createElement(elementType, properties, parent, factory) {
    const element = factory.create(elementType, properties);

    if (parent) {
        element.$parent = parent;
    }

    return element;
}

export function createVariables(properties, parent, bpmnFactory) {
    return createElement('wf:Variables', properties, parent, bpmnFactory);
}


export function nextId(prefix) {
    const ids = new Ids([32, 32, 1]);

    return ids.nextPrefixed(prefix);
}