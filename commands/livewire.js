const times         = require('./functions')

module.exports = function(vscode, fs, pathwork, path){
    vscode.window.showInputBox({
        prompt: "name of component",
        placeHolder: "name of component"
    }).then(function(val) {
        execute(vscode, fs, pathwork, path, val)
    })
}

function execute(vscode, fs, pathwork, path, val) {
    var date 	 	= new Date()
    var time		= times.leadZeroHours(date)+times.leadZeroMinute(date)+times.leadZeroSecond(date)
    var format		= date.getFullYear()+"-0"+date.getMonth().toString().slice(-2)+"-0"+date.getDate().toString().slice(-2)+"-"+time
    var filename	= `${val}.php`
    var pathfile 	= path.join(pathwork + "/app/Database/Migrations/"+filename)
    const migration_create = `<?php 
namespace App\\Database\\Migrations;

use CodeIgniter\\Database\\Migration;

class User extends Migration{
    public function up(){

        // Uncomment below if want config
        // $this->forge->addField([
        // 		'id'          		=> [
        // 				'type'           => 'INT',
        // 				'unsigned'       => TRUE,
        // 				'auto_increment' => TRUE
        // 		],
        // 		'title'       		=> [
        // 				'type'           => 'VARCHAR',
        // 				'constraint'     => '100',
        // 		],
        // ]);
        // $this->forge->addKey('id', TRUE);
        $this->forge->createTable('${value}');
    }

    public function down(){
        $this->forge->dropTable('${value}');
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