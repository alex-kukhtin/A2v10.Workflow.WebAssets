import { TextAreaEntry } from '@bpmn-io/properties-panel';

import { useService } from 'bpmn-js-properties-panel';
import { getExtensionElement, getOrCreateExtensionElements, getExtension, createElement } from '../util';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export default function GlobalProps(props) {
	return [
		{
			id: 'global',
			component: GlobalScriptProperty,
			isEdited: (node) => node && !!node.value
		}
	];
}

function GlobalScriptProperty(props) {

	const {element} = props;

	const commandStack = useService('commandStack');
	const translate = useService('translate');
	const debounce = useService('debounceInput');
	const bpmnFactory = useService('bpmnFactory');

	const setValue = (value) => {

		const commands = [];
		const bo = getBusinessObject(element);

		// (1) ensure extension elements
		let ee = getOrCreateExtensionElements(element, bpmnFactory, commands);

		let gse = getExtension(bo, 'wf:GlobalScript');
		// (2) ensure GlobalScript extension

		if (!gse) {
			gse = createElement('wf:GlobalScript', {text: 'element text'}, ee, bpmnFactory);
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
	};

	const getValue = (parameter) => {
		let ee = getExtensionElement(element, 'wf:GlobalScript')
		return ee ? ee.text : '';
	};

	return TextAreaEntry({
		element,
		id: 'global',
		label: translate('Script'),
		monospace: true,
		rows:7,
		getValue,
		setValue, 
		debounce
	});
}

