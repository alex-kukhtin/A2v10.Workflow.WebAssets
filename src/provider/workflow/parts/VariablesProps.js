import {
    getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import {
    createElement,
    createVariables,
    getVariables,
    getVariablesExtension,
    nextId
} from '../util';

import VariableProps from './VariableProps';

import { without } from 'min-dash';


export default function VariablesProps({ element, injector }) {

    const parameters = getVariables(element) || [];

    const bpmnFactory = injector.get('bpmnFactory'),
        commandStack = injector.get('commandStack');

    const items = parameters.map((parameter, index) => {
        const id = element.id + '-variable-' + index;

        return {
            id,
            label: parameter.get('Name') || '',
            entries: VariableProps({
                idPrefix: id,
                element,
                parameter
            }),
            autoFocusEntry: id + '-Name',
            remove: removeFactory({ commandStack, element, parameter })
        };
    });

    return {
        items,
        add: addFactory({ element, bpmnFactory, commandStack })
    };
}

function removeFactory({ commandStack, element, parameter }) {
    return function (event) {
        event.stopPropagation();


        const parameters = without(extension.get('values'), parameter);

        commandStack.execute('element.updateModdleProperties', {
            element,
            moddleElement: extension,
            properties: {
                values: parameters
            }
        });
    };
}

function addFactory({ element, bpmnFactory, commandStack }) {
    return function (event) {
        event.stopPropagation();

        const commands = [];

        const businessObject = getBusinessObject(element);

        let extensionElements = businessObject.get('extensionElements');

        // (1) ensure extension elements
        if (!extensionElements) {
            extensionElements = createElement(
                'bpmn:ExtensionElements',
                { values: [] },
                businessObject,
                bpmnFactory
            );

            commands.push({
                cmd: 'element.updateModdleProperties',
                context: {
                    element,
                    moddleElement: businessObject,
                    properties: { extensionElements }
                }
            });
        }

        let extension = getVariablesExtension(element);

        // (2) ensure variables extension
        if (!extension) {
            extension = createVariables({
                values: []
            }, extensionElements, bpmnFactory);

            commands.push({
                cmd: 'element.updateModdleProperties',
                context: {
                    element,
                    moddleElement: extensionElements,
                    properties: {
                        values: [...extensionElements.get('values'), extension]
                    }
                }
            });
        }

        // (3) create variable
        const newParameter = createElement('wf:Variable', {
            Name: nextId('Variable_'),
            //Value: '',
            Type: 'String',
            Direction: 'Local'
            //External: false,
            //CorrelationId : false
        }, extension, bpmnFactory);

        // (4) add parameter to list
        commands.push({
            cmd: 'element.updateModdleProperties',
            context: {
                element,
                moddleElement: extension,
                properties: {
                    values: [...extension.get('values'), newParameter]
                }
            }
        });

        commandStack.execute('properties-panel.multi-command-executor', commands);
    };
}
