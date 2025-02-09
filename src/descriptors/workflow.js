export default {
	"name": "wf",
	"prefix": "wf",
	"uri": "clr-namespace:A2v10.Workflow;assembly=A2v10.Workflow",
	"associations": [],
	"xml": {
		"tagAlias": "pascalCase"
	},
	"types": [
		{
			"name": "Variables",
			"superClass": ["Element"],
			"properties": [
				{
					"name": "values",
					"isMany": true,
					"type": "Variable"
				}
			]
		},
		{
			"name": "Variable",
			"superClass": [
				"Element"
			],
			"properties": [
				{
					"name": "Name",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "Value",
					"isAttr": true,
					"type": "String"
				}
			]
		}
	]
}