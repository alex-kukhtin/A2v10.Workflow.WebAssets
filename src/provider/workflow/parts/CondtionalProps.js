
import { TextAreaEntry, } from '@bpmn-io/properties-panel';


import { is, isAny } from 'bpmn-js/lib/util/ModelUtil';
import { useService } from 'bpmn-js-properties-panel';
import { createFormalExpression, updateCondition, isEdited, getConditionExpression } from '../util';


export default function ConditinalProps(props) {
	const { element, injector, parameter } = props;
	const entries = [];

	const CONDITIONAL_SOURCES = [
		'bpmn:Activity',
		'bpmn:ExclusiveGateway',
		'bpmn:InclusiveGateway',
		'bpmn:ComplexGateway'
	];


	if (is(element, 'bpmn:SequenceFlow') && isAny(element.source, CONDITIONAL_SOURCES)) {
		entries.push({
			id: 'conditionExpression',
			component: ConditionExpression,
			isEdited: isEdited
		});
	}
	return entries;
}

function ConditionExpression(props) {
	const { element } = props;
	const commandStack = useService('commandStack'),
		bpmnFactory = useService('bpmnFactory'),
		translate = useService('translate'),
		debounce = useService('debounceInput');

	const getValue = () => {
		let ce = getConditionExpression(element);
		if (ce)
			return ce.get('body');
		return '';
	};
	const setValue = value => {
		const conditionExpression = createFormalExpression(element, {
			body: value
		}, bpmnFactory);
		updateCondition(element, commandStack, conditionExpression);
	};
	return TextAreaEntry({
		element: element,
		id: "conditionExpression",
		label: translate('Condition Expression'),
		monospace: true,
		rows: 1,
		getValue: getValue,
		setValue: setValue,
		debounce: debounce
	});
}