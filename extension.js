// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { parse } = require('path');
const vscode = require('vscode');
const damageConverter = require('./damage_converter.js')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tendadogoblin-toolbelt.convertDamageToDice', async function () {
		// The code you place here will be executed every time your command is executed

		console.log(damageConverter)

		const value = await vscode.window.showInputBox({ placeHolder: 'Qual o valor do dano? [pode ser array de range]' })
		const parsedValue = JSON.parse(value)
		const finalValue = parsedValue ? parsedValue : value

		const mod = await vscode.window.showInputBox({ placeHolder: 'Qual o valor do mod? [pode ser array de range]' })
		const parsedMod = JSON.parse(mod)
		const finalMod = parsedMod ? parsedMod : mod

		const dices = await vscode.window.showInputBox({ placeHolder: 'Quais são os dados? (4, 6, 8, 10, etc) [pode ser array]' })
		const parsedDices = JSON.parse(dices)
		const finalDices = parsedDices ? parsedDices : dices

		const result = damageConverter({
			value: finalValue,
			baseMod: finalMod,
			diceSizes: finalDices
		})

		// Display a message box to the user
		vscode.window.showInformationMessage(result);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
