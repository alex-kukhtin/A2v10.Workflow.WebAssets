
import { TextFieldEntry, TextAreaEntry } from '@bpmn-io/properties-panel';

//import * as PropsPanel from '@bpmn-io/properties-panel';
//console.dir(PropsPanel); 

import { is, isAny } from 'bpmn-js/lib/util/ModelUtil';
import { useService } from 'bpmn-js-properties-panel';
import { getExtensionElementValue, setExtensionElementValue, createFormalExpression } from '../util';


export default function DetailsProps(props) {
	const { element, injector, parameter } = props;
	const entries = [];

	if (is(element, 'bpmn:UserTask')) {
		entries.push({
			id: 'bookmark',
			component: Bookmark
		});
		entries.push({
			id: 'inbox',
			component: Inbox
		});
	}

	if (is(element, 'bpmn:ScriptTask')) {
		entries.push({
			id: 'script',
			component: ScriptProp
		});
	}

	if (is(element, 'bpmn:CallActivity')) {
		entries.push({
			id: 'called-element',
			component: CalledElement
		});
		entries.push({
			id: 'parameters',
			component: Parameters
		});
	}

	if (isAny(element, ['bpmn:UserTask', 'bpmn:StartEvent', 'bpmn:EndEvent', 'bpmn:CallActivity'])) {
		entries.push({
			id: 'script',
			component: Script,
			isEdited: (node) => node && !!node.value
		});
	}

	return entries;
}

function Bookmark(props) {
	const { element } = props;

	const translate = useService('translate');
	const debounce = useService('debounceInput');
	const modeling = useService('modeling');

	const setValue = (value) => {
		modeling.updateProperties(element, {
			bookmark: value
		});
	};

	const getValue = (parameter) => {
		return element.businessObject.bookmark ?? '';
	};

	return TextFieldEntry({
		element,
		id: 'bookmark',
		label: translate('Bookmark'),
		getValue,
		setValue,
		debounce
	});
}

function ScriptProp(props) {
	const { element } = props;

	const translate = useService('translate');
	const debounce = useService('debounceInput');
	const modeling = useService('modeling');

	const setValue = (value) => {
		modeling.updateProperties(element, {
			script: value
		});
	};

	const getValue = (parameter) => {
		return element.businessObject.script ?? '';
	};

	return TextAreaEntry({
		element,
		id: 'script',
		label:  translate('Script'),
		monospace: true,
		rows: 7,
		getValue,
		setValue,
		debounce,
	});
}

function Script(props) {
	const { element } = props;

	const translate = useService('translate');
	const debounce = useService('debounceInput');

	return TextAreaEntry({
		element,
		id: 'script',
		label: translate('Script'),
		description: translate('Executed after completion'),
		monospace: true,
		rows: 7,
		getValue: getExtensionElementValue(element, "wf:Script"),
		setValue: setExtensionElementValue(element, "wf:Script"),
		debounce
	});
}

function Inbox(props) {
	const { element } = props;

	const translate = useService('translate');
	const debounce = useService('debounceInput');

	return TextAreaEntry({
		element,
		id: 'inbox',
		label: translate('Inbox'),
		monospace: true,
		rows: 7,
		getValue: getExtensionElementValue(element, "wf:Inbox"),
		setValue: setExtensionElementValue(element, "wf:Inbox"),
		debounce
	});
}

function CalledElement(props) {
	const { element } = props;

	const translate = useService('translate');
	const debounce = useService('debounceInput');
	const modeling = useService('modeling');

	const setValue = (value) => {
		modeling.updateProperties(element, {
			calledElement: value
		});
	};

	const getValue = (parameter) => {
		return element.businessObject.calledElement ?? '';
	};

	return TextFieldEntry({
		element,
		id: 'called-element',
		label: translate('Called Element'),
		getValue,
		setValue,
		debounce
	});
}

function Parameters(props) {
	const { element } = props;

	const translate = useService('translate');
	const debounce = useService('debounceInput');

	return TextAreaEntry({
		element,
		id: 'parameters',
		label: translate('Parameters'),
		monospace: true,
		rows: 2,
		getValue: getExtensionElementValue(element, "wf:Parameters"),
		setValue: setExtensionElementValue(element, "wf:Parameters"),
		debounce
	});
}

