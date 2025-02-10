import { TextAreaEntry } from '@bpmn-io/properties-panel';

import { useService } from 'bpmn-js-properties-panel';
import { setExtensionElementValue, getExtensionElementValue} from '../util';

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

	const translate = useService('translate');
	const debounce = useService('debounceInput');

	return TextAreaEntry({
		element,
		id: 'global',
		label: translate('Script'),
		monospace: true,
		rows: 7,
		getValue: getExtensionElementValue(element, "wf:GlobalScript"),
		setValue: setExtensionElementValue(element, "wf:GlobalScript"),
		debounce
	});
}

