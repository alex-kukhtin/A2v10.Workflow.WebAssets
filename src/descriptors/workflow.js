﻿export default {
	"name": "wf",
	"prefix": "wf",
	"uri": "clr-namespace:A2v10.Workflow;assembly=A2v10.Workflow",
	"associations": [],
	"types": [
		{
			name: 'Variables',
			"superClass": ['Element'],
			properties: [
				{
					name: "values",
					isMany: true,
					type: "Variable"
				}
			]
		},
		{
			name: "Variable",
			superClass: [
				'Element'
			],
			properties: [
				{
					name: "Name",
					isAttr: true,
					type: "String"
				},
				{
					name: "Value",
					isAttr: true,
					type: "String"
				},
				{
					name: "Type",
					isAttr: true,
					type: "String"
				},
				{
					name: "Dir",
					isAttr: true,
					type: "String"
				},
				{
					name: "External",
					isAttr: true,
					type: "Boolean"
				},
				{
					name: "CorrelationId",
					isAttr: true,
					type: "Boolean"
				}
			]
		},
		{
			name: "GlobalScript",
			superClass: [
				'Element'
			],
			properties: [
				{
					name: "text",
					type: "String",
					isBody: true
				}
			]
		},
		{
			name: 'Script',
			superClass: [
				'Element'
			],
			properties: [
				{
					name: "text",
					type: "String",
					isBody: true
				}
			]
		},
		{
			name: "wfCallActivity",
			extends: [
				"bpmn:CallActivity"
			],
			properties: [
				{
					name: "correlationId",
					isAttr: true,
					type: "String"
				}
			]
		},
		{
			name: "wfUserTask",
			extends: [
				"bpmn:UserTask"
			],
			properties: [
				{
					"name": "bookmark",
					"isAttr": true,
					"type": "String"
				}
			]
		},
		{
			name: "Inbox",
			superClass: [
				"Element"
			],
			properties: [
				{
					name: "text",
					type: "String",
					isBody: true
				}
			]
		},
		{
			name: "Parameters",
			superClass: [
				"Element"
			],
			properties: [
				{
					name: "text",
					type: "String",
					isBody: true
				}
			]
		},
		{
			name: "wfMultiInstanceLoopCharacteristics",
			extends: [
				"bpmn:MultiInstanceLoopCharacteristics"
			],
			properties: [
				{
					"name": "collection",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "variable",
					"isAttr": true,
					"type": "String"
				}
			]
		},
	]
}