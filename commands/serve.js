const shell 	= require('./functions')
var terminal 	= {}
module.exports.start = function (vscode) {
	let NEXT_TERM_ID = 1;
    terminal 	= vscode.window.createTerminal(`Laravel Serve ${NEXT_TERM_ID}`);
	terminal.sendText("xdg-open http://localhost:8000; php artisan serve");
	vscode.window.showInformationMessage('Successfuly Run Laravel Server On http://localhost:8000')
}

module.exports.stop = function (vscode) {
	shell.closeTerminal(terminal)
	vscode.window.showInformationMessage('Successfuly Stop Laravel Server')
}

module.exports.restart = function (vscode) {
	if (terminal === null) {
		vscode.window.showWarningMessage("Server not running !");
	}else{
		shell.closeTerminal(terminal)
		let NEXT_TERM_ID 	= 1;
		terminal 			= vscode.window.createTerminal(`Laravel Serve ${NEXT_TERM_ID}`);
		terminal.sendText("xdg-open http://localhost:8000; php artisan serve");
		vscode.window.showInformationMessage('Successfuly Restart Server on http://localhost:8000')
	}
}