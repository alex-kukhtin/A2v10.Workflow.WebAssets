import Ids from 'ids';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import { useService } from 'bpmn-js-properties-panel';

export function isEdited(node) {
    return node && !!node.value;
}

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

function getBusinessObject$1(element) {
	return element && element.businessObject || element;
}

function is$4(element, type) {
	var bo = getBusinessObject$1(element);
	return bo && typeof bo.$instanceOf === 'function' && bo.$instanceOf(type);
}


function getConditionalEventDefinition(element) {
	if (!is$4(element, 'bpmn:Event')) {
		return false;
	}
	return getEventDefinition$1(element, 'bpmn:ConditionalEventDefinition');
}

export function createFormalExpression(parent, attributes, bpmnFactory) {
	return createElement('bpmn:FormalExpression', attributes, is$4(parent, 'bpmn:SequenceFlow') ? getBusinessObject$1(parent) : getConditionalEventDefinition(parent), bpmnFactory);
}

export function updateCondition(element, commandStack, condition = undefined) {
    if (is$4(element, 'bpmn:SequenceFlow')) {
        commandStack.execute('element.updateProperties', {
            element,
            properties: {
                conditionExpression: condition
            }
        });
    } else {
        commandStack.execute('element.updateModdleProperties', {
            element,
            moddleElement: getConditionalEventDefinition(element),
            properties: {
                condition
            }
        });
    }
}

export function getConditionExpression(element) {
    const businessObject = getBusinessObject$1(element);
    if (is$4(businessObject, 'bpmn:SequenceFlow')) {
        return businessObject.get('conditionExpression');
    } else if (getConditionalEventDefinition(businessObject)) {
        return getConditionalEventDefinition(businessObject).get('condition');
    }
}
