
import { TextFieldEntry } from '@bpmn-io/properties-panel';

import { is, isAny } from 'bpmn-js/lib/util/ModelUtil';
import { useService } from 'bpmn-js-properties-panel';


export default function DetailsProps(props) {
	const { element, injector, parameter } = props;
	const entries = [];

	if (is(element, 'bpmn:UserTask')) {
		entries.push({
			id: 'bookmark',
			component: Bookmark
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

