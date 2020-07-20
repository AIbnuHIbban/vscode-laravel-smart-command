const times         = require('./functions')

module.exports = function(vscode, fs, pathwork, path, table_name = false, show = true){
    if (table_name !== false) {
        var val = ""
        execute(vscode, fs, pathwork, path, val, table_name)
    }else{
        vscode.window.showInputBox({
            prompt: "name of table",
            placeHolder: "name of table"
        }).then(function(val) {
            execute(vscode, fs, pathwork, path, val, show)
        })
    }
}

function execute(vscode, fs, pathwork, path, val, table_name = false, show) {
    var value
    if (table_name !== false) {
        value   = table_name
    }else{
        value   = val
    }
    var date 	 	= new Date()
    var time		= times.leadZeroHours(date)+times.leadZeroMinute(date)+times.leadZeroSecond(date)
    var format		= date.getFullYear()+"_0"+date.getMonth().toString().slice(-2)+"_0"+date.getDate().toString().slice(-2)+"_"+time
    var filename	= `${format}_create_${value}_table.php`
    var pathfile 	= path.join(pathwork + "/database/migrations/"+filename)
    const migration_create = `<?php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

class Create${times.capitalize(value)}Table extends Migration{
    
    public function up(){
        Schema::create('${value}', function (Blueprint $table) {
            $table->id();

            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('${value}');
    }
}`
    fs.access(pathfile, function(err) {
        if (err) {
            fs.open(pathfile, "w+", function(err, fd) {
                if (err) throw err;
                fs.writeFileSync(fd, migration_create)
                if (show === true) {
                    var openPath = vscode.Uri.file(pathfile); //A request file path
                    vscode.workspace.openTextDocument(openPath).then(function(value) {
                        vscode.window.showTextDocument(value);
                    });
                }
            })
            vscode.window.showInformationMessage('Successfully added a migration !');
        }else{
            vscode.window.showWarningMessage("Name already exist !");
        }
    })
}