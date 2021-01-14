// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const cp = require('child_process');

/*
function getTask() {
    const taskDef = {
        type: 'shell'
    };
    const execution = new vscode.ShellExecution('chdir', {
        cwd: 'C:\\Windows\\System32'
    }); 
    return new vscode.Task(taskDef, 'print_cwd', 'myext', execution);
}
*/

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let out = vscode.window.createOutputChannel("Python Installer");

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "python-installer-extension" is now active!');
	out.appendLine('Congratulations, your extension "python-installer-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('python-installer-extension.pythonInstaller', function () {
		// The code you place here will be executed every time your command is executed

		let out = vscode.window.createOutputChannel("Python Installer");

		// Display a message box to the user
		out.clear();
		out.appendLine('Python Installer Begins!');
		var destdir = context.storageUri;

		if (typeof destdir == "undefined") {
			destdir = "/tmp";
		}

		//let destdir = "/home/user";
		//let destdir = "/tmp";
		//let destdir = ".";
		out.appendLine('destdir: ' + destdir);

		let destfile = destdir + "/bas_install_python.sh";
		out.appendLine('destfile: ' + destfile);

		let remove_sh_file = false;

		vscode.workspace.fs.createDirectory(destdir);

		// let currentTheme = await vscode.workspace.getConfiguration().get("workbench.colorTheme");
		vscode.workspace.getConfiguration("workbench", (currentTheme) => {
			out.appendLine('currentTheme: ' + currentTheme);
		});

		//await vscode.workspace.getConfiguration().update("workbench.colorTheme", "Red");

		//let newTheme = await vscode.workspace.getConfiguration().get("workbench.colorTheme");

		// let settings = vscode.workspace.getConfiguration("python");
		// settings.update("condaPath", "whatever") => {
		// 	ConfigurationLoader.LoadConfiguration() => {

		// 	}
		// }
		// await ;

		var shellcmd = "curl -s -L -o " + destfile + " https://raw.githubusercontent.com/SAP-samples/hana-python-securestore/master/tools/bas_install_python.sh";
		out.appendLine('shellcmd: ' + shellcmd);
		console.log()

		cp.exec(shellcmd, (err, stdout, stderr) => {
			out.appendLine('curl stdout: ' + stdout);
			out.appendLine('curl stderr: ' + stderr);
			if (err) {
				out.appendLine('curl error: ' + err);
			}

			shellcmd = "/bin/bash " + destfile;
			out.appendLine('shellcmd: ' + shellcmd);

			cp.exec(shellcmd, (err, stdout, stderr) => {
				out.appendLine('bash stdout: ' + stdout);
				out.appendLine('bash stderr: ' + stderr);
				if (err) {
					out.appendLine('bash error: ' + err);
				}

				if (remove_sh_file) {
					shellcmd = "rm -f " + destfile;
					out.appendLine('shellcmd: ' + shellcmd);

					cp.exec(shellcmd, (err, stdout, stderr) => {
						out.appendLine('rm -f stdout: ' + stdout);
						out.appendLine('rm -f stderr: ' + stderr);
						if (err) {
							out.appendLine('rm -f error: ' + err);
						}
						out.appendLine('Python Installer Finished!');
						vscode.window.showInformationMessage('Python 3.9.0 Installed OK.');

						
						vscode.window.showInformationMessage('Verify with "python -V" in a new terminal window.');
					});
				}
				else {
					out.appendLine('Python Installer Finished!');
				}
			});
		});
		
		///bin/bash /home/user/bas_install_python.sh
		
		//vscode.window.showInformationMessage('Storage:' + context.storageUri);
		//vscode.workspace.fs.createDirectory(context.storageUri);
		//vscode.workspace.commands
		//vscode.tasks.executeTask

		// Display a message box to the user
		//vscode.window.showInformationMessage('Python Installer Finished!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
