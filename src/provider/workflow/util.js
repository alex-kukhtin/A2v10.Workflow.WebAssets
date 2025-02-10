import Ids from 'ids';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import { useService } from 'bpmn-js-properties-panel';

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

export function setExtensionElementValue(element, elemName) {

	const bpmnFactory = useService('bpmnFactory');
	const commandStack = useService('commandStack');

	return function (value) {
		const commands = [];
		const bo = getBusinessObject(element);

		// (1) ensure extension elements
		let ee = getOrCreateExtensionElements(element, bpmnFactory, commands);

		let gse = getExtension(bo, elemName);
		// (2) ensure Script extension

		if (!gse) {
			gse = createElement(elemName, { text: value }, ee, bpmnFactory);
			commands.push({
				cmd: 'element.updateModdleProperties',
				context: {
					element,
					moddleElement: ee,
					properties: {
						values: [...ee.get('values'), gse]
					}
				}
			});
		}

		// (3) update value
		commands.push({
			cmd: 'element.updateModdleProperties',
			context: {
				element,
				moddleElement: gse,
				properties: {
					text: value
				}
			}
		});

		commandStack.execute('properties-panel.multi-command-executor', commands);
	}
}

export function getExtensionElementValue(element, elemName) {
	return function (parameter) {
		let ee = getExtensionElement(element, elemName)
		return ee ? ee.text : '';
	}
};

