
import { TextAreaEntry, } from '@bpmn-io/properties-panel';

import { is, isAny } from 'bpmn-js/lib/util/ModelUtil';
import { useService } from 'bpmn-js-properties-panel';
import { isEdited} from '../util';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export default function MultiInstanceProps(props) {
	const { element, injector, parameter } = props;
	const entries = [];

	entries.push({
		id: 'conditionExpression',
		component: Collection,
		isEdited: isEdited
	});
	entries.push({
		id: 'conditionVariable',
		component: Variable,
		isEdited: isEdited
	});
	return entries;
}

function getLoopCharacteristics(element) {
	var bo = getBusinessObject(element);
	var lc = bo.loopCharacteristics;
	if (is(lc, "bpmn:StandardLoopCharacteristics"))
		return null;
	return lc;
}

function Collection(props) {
	const { element } = props;
	const commandStack = useService('commandStack'),
		translate = useService('translate'),
		debounce = useService('debounceInput');

	const getValue = () => {
		var lc = getLoopCharacteristics(element);
		return (lc ? lc.collection : '') ?? '';
	};
	const setValue = value => {
		var lc = getLoopCharacteristics(element);
		commandStack.execute('element.updateModdleProperties', {
			element,
			moddleElement: lc,
			properties: {
				collection: value
			}
		});
	};

	return TextAreaEntry({
		element: element,
		id: "mi-collection",
		label: translate('Collection'),
		monospace: true,
		rows: 1,
		getValue: getValue,
		setValue: setValue,
		debounce: debounce
	});
}


function Variable(props) {
	const { element } = props;
	const commandStack = useService('commandStack'),
		translate = useService('translate'),
		debounce = useService('debounceInput');

	const getValue = () => {
		var lc = getLoopCharacteristics(element);
		return (lc ? lc.variable : '') ?? '';
	};
	const setValue = value => {
		var lc = getLoopCharacteristics(element);
		commandStack.execute('element.updateModdleProperties', {
			element,
			moddleElement: lc,
			properties: {
				variable: value
			}
		});
	};

	return TextAreaEntry({
		element: element,
		id: "mi-variable",
		label: translate('Variable'),
		monospace: true,
		rows: 1,
		getValue: getValue,
		setValue: setValue,
		debounce: debounce
	});
}
