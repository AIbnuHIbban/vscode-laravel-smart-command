const migration     = require('./migration')
const func          = require('./functions')
const controller    = require('./controller')

module.exports = function(vscode, fs,pathwork, path){
    vscode.window.showInputBox({
        prompt: "Model Name",
        placeHolder: "Model Name"
    }).then(function(model_name) {
        vscode.window.showInputBox({
            prompt: "Define the table name",
            placeHolder: "Table Name"
        }).then(async (table_name) =>  {
            const answ_migration    = await vscode.window.showQuickPick(['Yes', 'No'], {
                placeHolder: "Also create migration for this model ?",
            });
            const answ_controller   = await vscode.window.showQuickPick(['Yes', 'No'], {
                placeHolder: "Also create controller for this model ?",
            });

            if (answ_migration == "Yes") {
                if (answ_controller == "Yes") {
                    var show    = false
                    controller(vscode, fs, pathwork, path, model_name)
                }
                execute(vscode, fs, pathwork, path, model_name, table_name, show)
                migration(vscode, fs, pathwork, path, table_name,show)
            }else{
                if (answ_controller == "Yes") {
                    var show    = false
                    controller(vscode, fs, pathwork, path, model_name)
                }
                execute(vscode, fs, pathwork, path, model_name, table_name, show)
            }
        })
    })
}

function execute(vscode, fs, pathwork, path, model_name, table_name,show = true) {
    var filename	= `${func.capitalize(model_name)}.php`
    var pathfile 	= path.join(pathwork + "/app/"+filename)
    
    const controller_create = `<?php
namespace App;

use Illuminate\\Database\\Eloquent\\Model;

class ${func.capitalize(model_name)} extends Model{
    protected $table = "${table_name}";

    
}`
    fs.access(pathfile, function(err) {
        if (err) {
            fs.open(pathfile, "w+", function(err, fd) {
                if (err) throw err;
                fs.writeFileSync(fd, controller_create)
                if (show === true) {
                    var openPath = vscode.Uri.file(pathfile);
                    vscode.workspace.openTextDocument(openPath).then(function(val) {
                        vscode.window.showTextDocument(val);
                    });
                }
            })
            vscode.window.showInformationMessage('Successfully added a model !');
        }else{
            vscode.window.showWarningMessage("Name already exist !");
        }
    })
}
