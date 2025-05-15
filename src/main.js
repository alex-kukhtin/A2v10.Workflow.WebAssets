
//import inherits from 'inherits-browser';

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
import './css/addition.css';

import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';
//import { ZeebePropertiesProviderModule } from 'bpmn-js-properties-panel';

import WorkflowPropertiesProvider from './provider/workflow';
import workflowModdleDescriptor from './descriptors/workflow';

const defaultXml = `
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
	xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
	xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
	xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:wf="clr-namespace:A2v10.Workflow;assembly=A2v10.Workflow">
	<process id="Process_1" isExecutable="true">
		<startEvent id="StartEvent_1" name="Start">
			<outgoing>SequenceFlow_1</outgoing>
		</startEvent>
		<task id="Task_1">
			<incoming>SequenceFlow_1</incoming>
			<outgoing>SequenceFlow_2</outgoing>
		</task>
		<endEvent id="EndEvent_1" name="End">
			<incoming>SequenceFlow_2</incoming>
		</endEvent>
		<sequenceFlow id="SequenceFlow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
		<sequenceFlow id="SequenceFlow_2" sourceRef="Task_1" targetRef="EndEvent_1" />
	</process>
	<bpmndi:BPMNDiagram id="BpmnDiagram_1">
		<bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
			<bpmndi:BPMNEdge id="SequenceFlow_1_di" bpmnElement="SequenceFlow_1">
				<omgdi:waypoint x="188" y="210" />
				<omgdi:waypoint x="290" y="210" />
			</bpmndi:BPMNEdge>
			<bpmndi:BPMNEdge id="SequenceFlow_2_di" bpmnElement="SequenceFlow_2">
				<omgdi:waypoint x="390" y="210" />
				<omgdi:waypoint x="482" y="210" />
			</bpmndi:BPMNEdge>
			<bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
				<omgdc:Bounds x="152" y="192" width="36" height="36" />
				<bpmndi:BPMNLabel>
					<omgdc:Bounds x="159" y="235" width="23" height="14" />
				</bpmndi:BPMNLabel>
			</bpmndi:BPMNShape>
			<bpmndi:BPMNShape id="Event_1_di" bpmnElement="EndEvent_1">
				<omgdc:Bounds x="482" y="192" width="36" height="36" />
				<bpmndi:BPMNLabel>
					<omgdc:Bounds x="489" y="235" width="23" height="14" />
				</bpmndi:BPMNLabel>
			</bpmndi:BPMNShape>
			<bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
				<omgdc:Bounds x="290" y="170" width="100" height="80" />
			</bpmndi:BPMNShape>
		</bpmndi:BPMNPlane>
	</bpmndi:BPMNDiagram>
</definitions>
`;


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
				ZoomScrollModule,
				modeling
			],
			moddleExtensions: {
				Workflow: workflowModdleDescriptor,
			}
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
				//ZeebePropertiesProviderModule,
				WorkflowPropertiesProvider
			],
			moddleExtensions: {
				Workflow: workflowModdleDescriptor,
			}
		});
	};

	this.registerDropZone = registerDropZone;
	this.saveXmlAndSvg = saveXmlAndSvg
	this.defaultXml = defaultXml
};

function registerDropZone(container, callback) {

	if (!window.FileList || !window.FileReader) {
		window.alert('Looks like you use an older browser that does not support drag and drop.');
		return;
	}

	function handleFileSelect(e) {
		e.stopPropagation();
		e.preventDefault();

		let files = e.dataTransfer.files;
		let file = files[0];
		let reader = new FileReader();

		reader.onload = function (e) {
			let xml = e.target.result;
			callback({ xml, name: file.name });
		};
		reader.readAsText(file);
	}
	function handleDragOver(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}
	container.addEventListener('dragover', handleDragOver, false);
	container.addEventListener('drop', handleFileSelect, false);
};


async function saveXmlAndSvg(modeler) {
	let xmlResult = await modeler.saveXML();
	let xml = xmlResult.xml;

	// saveSVG destroys main CSS table!
	let el = document.createElement('div');

	let clone = this.createViewer(el);
	document.body.appendChild(el);
	await clone.importXML(xml);

	let svgResult = await clone.saveSVG();

	el.remove();

	// fit svg viewbox
	let svgParser = new DOMParser();
	let svgObj = svgParser.parseFromString(svgResult.svg, 'image/svg+xml');
	let baseViewBox = svgObj.documentElement.viewBox.baseVal;

	const WTH = 500;
	const HTH = 300;

	baseViewBox.width += 10;
	baseViewBox.height += 10;
	baseViewBox.y -= 5;

	svgResult.svg = svgObj.documentElement.outerHTML;

	let zoom = 1;
	if (baseViewBox.width > WTH || baseViewBox.height > HTH)
		zoom = Math.min(WTH / baseViewBox.width, HTH / baseViewBox.height);

	return {
		xml,
		svg: svgResult.svg,
		rect: {
			width: baseViewBox.width,
			height: baseViewBox.height,
		},
		zoom
	};
}