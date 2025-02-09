import { TextFieldEntry, CheckboxEntry } from '@bpmn-io/properties-panel';

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

	const {
		idPrefix,
		parameter
	} = props;

	const entries = [
		{
			id: idPrefix + '-name',
			component: Name,
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
