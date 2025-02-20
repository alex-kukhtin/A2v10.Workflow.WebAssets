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

	const entries = [
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

	return entries;
}

function Name(props) {
	const {
		idPrefix,
		element,
		parameter
	} = props;

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

	const getValue = (parameter) => {
		return parameter.Name;
	};

	return TextFieldEntry({
		element: parameter,
		id: idPrefix + '-name',
		label: translate('Name'),
		getValue,
		setValue,
		debounce
	});
}

function Value(props) {
	const {
		idPrefix,
		element,
		parameter
	} = props;

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

	const getValue = (parameter) => {
		return parameter.Value;
	};

	return TextFieldEntry({
		element: parameter,
		id: idPrefix + '-value',
		label: translate('Value'),
		getValue,
		setValue,
		debounce
	});
}

function External(props) {
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
				External: value
			}
		});
	};

	const getValue = (parameter) => {
		return parameter.External || false;
	};

	return CheckboxEntry({
		element: parameter,
		id: idPrefix + '-external',
		label: translate('External'),
		getValue,
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

	const getValue = (parameter) => {
		return parameter.CorrelationId || false;
	};

	return CheckboxEntry({
		element: parameter,
		id: idPrefix + '-correlationid',
		label: translate('CorrelationId'),
		getValue,
		setValue
	});
}


function Type(props) {
	const { element, parameter } = props;

	const commandStack = useService('commandStack');
	const translate = useService('translate');

	const getValue = (parameter) => {
		return parameter.Type || 'String';
	};	

	const setValue = (value) => {
		commandStack.execute('element.updateModdleProperties', {
			element,
			moddleElement: parameter,
			properties: {
				Type: value
			}
		});
	};

	const getOptions = (elem) => {
		return [
			{ value: 'String', label: 'String' },
			{ value: 'Number', label: 'Number' },
			{ value: 'Boolean', label: 'Boolean' },
			{ value: 'Object', label: 'Object' },
			{ value: 'PersistentObject', label: 'PersistentObject' },
			{ value: 'Bigint', label: 'Bigint' },
			{ value: 'Date', label: 'Date' },
			{ value: 'Guid', label: 'Guid' }
		];
	};
	return SelectEntry({
		element,
		id: 'variableType',
		label: translate('Type'),
		getValue,
		setValue,
		getOptions
	});
}

function Direction(props) {
	const { element, parameter } = props;

	const commandStack = useService('commandStack');
	const translate = useService('translate');

	const getValue = (parameter) => {
		return parameter.Dir || 'Local';
	};

	const setValue = (value) => {
		commandStack.execute('element.updateModdleProperties', {
			element,
			moddleElement: parameter,
			properties: {
				Dir: value
			}
		});
	};

	const getOptions = (elem) => {
		return [
			{ value: 'Local', label: 'Local' },
			{ value: 'In', label: 'In' },
			{ value: 'Out', label: 'Out' },
			{ value: 'InOut', label: 'InOut' }
		];
	};

	return SelectEntry({
		element,
		id: 'variableDirection',
		label: translate('Direction'),
		getValue,
		setValue,
		getOptions
	});
}
