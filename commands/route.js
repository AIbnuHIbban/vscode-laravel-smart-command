const capitalize        = require('./functions');

module.exports = function(vscode, fs,pathwork, path){
    vscode.window.showInputBox({
        prompt: "Route Name",
        placeHolder: "Route Name"
    }).then(function(route_name) {
        vscode.window.showInputBox({
            prompt: "Controller Name/Class (Enter to Set it Blank)",
            placeHolder: "Controller Name/Class (Enter to Set it Blank)"
        }).then(function(controller_name) {
            vscode.window.showInputBox({
                prompt: "Function Name (Enter to Set it Blank)",
                placeHolder: "Function Name (Enter to Set it Blank)"
            }).then(function(function_name) {
                execute(vscode, fs,pathwork, path, route_name, controller_name, function_name)
            })
        })
    })
}

function execute(vscode, fs,pathwork, path, route_name,controller_name, function_name) {
    let append    = `Route::get('${route_name}', [${capitalize.capitalize(controller_name)},'${function_name}']);`
    var pathfile 	= path.join(pathwork + "/routes/web.php")
    var openPath    = vscode.Uri.file(pathfile); //A request file path
    
    vscode.workspace.openTextDocument(openPath).then(function(value) {
        vscode.window.showTextDocument(value)
    })
    vscode.workspace.openTextDocument(openPath).then(function(value) {
        vscode.window.showTextDocument(value, 1, false).then((e) => {
            e.edit((edit) => {
                const editor = vscode.window.activeTextEditor;
                const position = editor.selection.active;
                
                if (editor) {
                    var newPosition = position.with(100, 0);
                    var newSelection = new vscode.Selection(newPosition, newPosition);
                    editor.selection = newSelection;
                    edit.replace(newSelection, append)
                }
            })
        });
    });
    vscode.window.showInformationMessage('Successfully added a route !');
}