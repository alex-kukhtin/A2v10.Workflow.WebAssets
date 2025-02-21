import { TextFieldEntry, CheckboxEntry, SelectEntry } from '@bpmn-io/properties-panel';

import { useService } from 'bpmn-js-properties-panel';

/**
 * ToggleSwitchEntry,
 * CollapsibleEntry,
 * CheckboxEntry
 * SelectEntry,
 * TextAreaEntry
 * ReferenceSelectEntry
 * 
 */

export default function VariableProps(props) {

	const {idPrefix, parameter } = props;

	return [
		{
			id: idPrefix + '-name',
			component: Name,
			idPrefix,
			parameter
		},
		{
			id: idPrefix + '-type',
			component: Type,
			idPrefix,
			parameter
		},
		{
			id: idPrefix + '-dir',
			component: Direction,
			idPrefix,
			parameter
		},
		{
			id: idPrefix + '-value',
			component: Value,
			idPrefix,
			parameter
		},
		{
			id: idPrefix + '-external',
			component: External,
			idPrefix,
			parameter
		},
		{
			id: idPrefix + '-correlationid',
			component: CorrelationId,
			idPrefix,
			parameter
		}
	];
}

function Name(props) {
	const { idPrefix, element, parameter } = props;

	const commandStack = useService('commandStack');
	const translate = useService('translate');
	const debounce = useService('debounceInput');

	const setValue = (value) => {
		commandStack.execute('element.updateModdleProperties', {
			element,
			moddleElement: parameter,
			properties: {
				Name: value
			}
		});
	};

	return TextFieldEntry({
		element: parameter,
		id: idPrefix + '-name',
		label: translate('Name'),
		getValue: () => parameter.Name,
		setValue,
		debounce
	});
}

function Value(props) {
	const { idPrefix, element, parameter } = props;

	const commandStack = useService('commandStack');
	const translate = useService('translate');
	const debounce = useService('debounceInput');

	const setValue = (value) => {
		commandStack.execute('element.updateModdleProperties', {
			element,
			moddleElement: parameter,
			properties: {
				Value: value
			}
		});
	};

	return TextFieldEntry({
		element: parameter,
		id: idPrefix + '-value',
		label: translate('Value'),
		getValue: () => parameter.Value,
		setValue,
		debounce
	});
}

function External(props) {
	const {idPrefix, element, parameter} = props;

	const commandStack = useService('commandStack');
	const translate = useService('translate');

	const setValue = (value) => {
		commandStack.execute('element.updateModdleProperties', {
			element,
			moddleElement: parameter,
			properties: {
				External: value
			}
		});
	};

	return CheckboxEntry({
		element: parameter,
		id: idPrefix + '-external',
		label: translate('External'),
		getValue: () => parameter.External || false,
		setValue
	});
}

function CorrelationId(props) {
	const {
		idPrefix,
		element,
		parameter
	} = props;

	const commandStack = useService('commandStack');
	const translate = useService('translate');

	const setValue = (value) => {
		commandStack.execute('element.updateModdleProperties', {
			element,
			moddleElement: parameter,
			properties: {
				CorrelationId: value
			}
		});
	};

	return CheckboxEntry({
		element: parameter,
		id: idPrefix + '-correlationid',
		label: translate('CorrelationId'),
		getValue: () => parameter.CorrelationId || false,	
		setValue
	});
}


function Type(props) {
	const { idPrefix, element, parameter } = props;

	const commandStack = useService('commandStack');
	const translate = useService('translate');

	const setValue = (value) => {
		commandStack.execute('element.updateModdleProperties', {
			element,
			moddleElement: parameter,
			properties: {
				Type: value
			}
		});
	};

	const getOptions = (elem) => [
		{ value: 'String', label: 'String' },
		{ value: 'Number', label: 'Number' },
		{ value: 'Boolean', label: 'Boolean' },
		{ value: 'Object', label: 'Object' },
		{ value: 'PersistentObject', label: 'PersistentObject' },
		{ value: 'Bigint', label: 'Bigint' },
		{ value: 'Date', label: 'Date' },
		{ value: 'Guid', label: 'Guid' }
	];

	return SelectEntry({
		element,
		id: idPrefix + '-variableType',
		label: translate('Type'),
		getValue: () => parameter.Type || 'String',
		setValue,
		getOptions
	});
}

function Direction(props) {
	const { idPrefix, element, parameter } = props;

	const commandStack = useService('commandStack');
	const translate = useService('translate');

	const setValue = (value) => {
		commandStack.execute('element.updateModdleProperties', {
			element,
			moddleElement: parameter,
			properties: {
				Dir: value
			}
		});
	};

	const getOptions = (elem) => [
		{ value: 'Local', label: 'Local' },
		{ value: 'In', label: 'In' },
		{ value: 'Out', label: 'Out' },
		{ value: 'InOut', label: 'InOut' }
	];

	return SelectEntry({
		element,
		id: idPrefix + '-variableDir',
		label: translate('Direction'),
		getValue: () => parameter.Dir || 'Local',
		setValue,
		getOptions
	});
}
