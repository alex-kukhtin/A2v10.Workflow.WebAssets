import { TextFieldEntry } from '@bpmn-io/properties-panel';

import { useService } from 'bpmn-js-properties-panel';


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

	console.dir(props);
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

	/** 
	 * ToggleSwitchEntry,
	 * CollapsibleEntry,
	 * CheckboxEntry
	 * SelectEntry,
	 * TextAreaEntry
	 * ReferenceSelectEntry
	 * 
	 */
}


