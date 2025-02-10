import inherits from 'inherits-browser';

import NavigatedViewer from 'bpmn-js/lib/Viewer';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import gridModule from 'diagram-js-grid';

import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import ColorPickerModule from 'bpmn-js-color-picker';

import modeling from 'bpmn-js/lib/features/modeling';

import '../node_modules/bpmn-js/dist/assets/bpmn-js.css';
import '../node_modules/bpmn-js/dist/assets/diagram-js.css';
import '../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '../node_modules/@bpmn-io/properties-panel/dist/assets/properties-panel.css';

import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule} from 'bpmn-js-properties-panel';

import WorkflowPropertiesProvider from './provider/workflow';
import workflowModdleDescriptor from './descriptors/workflow';

export default function() {
	this.createViewer = function (container) {
		return new NavigatedViewer({
			container,
			keyboard: {
				//bindTo: document.getRootNode()
			},
			additionalModules: [
				gridModule,
				MoveCanvasModule,
				ZoomScrollModule
			]
		});
	};
	this.createModeler = function (container, ppContainer) {
		return new BpmnModeler({
			container,
			propertiesPanel: {
				parent: ppContainer
			},
			additionalModules: [
				gridModule,
				ColorPickerModule,
			    BpmnPropertiesPanelModule,
				BpmnPropertiesProviderModule,
				WorkflowPropertiesProvider
			],
			moddleExtensions: {
				Workflow: workflowModdleDescriptor,
			}
		});
	};
};

