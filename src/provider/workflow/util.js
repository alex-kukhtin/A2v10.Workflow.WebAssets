import Ids from 'ids';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export function getExtension(bo, type) {
    if (!bo.extensionElements) {
        return null;
    }

    return bo.extensionElements.values.filter(function (e) {
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


export function nextId(prefix) {
    const ids = new Ids([32, 32, 1]);

    return ids.nextPrefixed(prefix);
}

export function getExtensionElement(elem, type) {
    if (!elem) return null;
    const bo = getBusinessObject(elem);
    return getExtension(bo, type);
}

export function getOrCreateExtensionElements(elem, bpmnFactory, commands) {

    const bo = getBusinessObject(elem);
    let ee = bo.get('extensionElements');

    // (1) ensure extension elements
    if (!ee) {
        ee = createElement(
            'bpmn:ExtensionElements',
            { values: [] },
            bo,
            bpmnFactory
        );

        commands.push({
            cmd: 'element.updateModdleProperties',
            context: {
                element: elem,
                moddleElement: bo,
                properties: { extensionElements: ee }
            }
        });
    }
    return ee;
}
