module.exports = function(vscode, fs,pathwork, path){
    vscode.window.showInputBox({
        prompt: "Seeder Name",
        placeHolder: "Seeder Name"
    }).then(function(val) {
        vscode.window.showInputBox({
            prompt: "Define the table name",
            placeHolder: "Table Name"
        }).then(function(table_name) {
            var filename	= `${val}.php`
            var pathfile 	= path.join(pathwork + "/database/seeds/"+filename)
            const controller_create = `<?php
use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\DB;

class ${val} extends Seeder{
    
    public function run(){
        // Option 1
        // $data = [
            
        // ];
        // DB::table('${table_name}')->create($data);

        // Option 2
        DB::table('${table_name}')->create([
            
        ]);
    }
}`
            fs.access(pathfile, function(err) {
                if (err) {
                    fs.open(pathfile, "w+", function(err, fd) {
                        if (err) throw err;
                        fs.writeFileSync(fd, controller_create)
                        // fs.close(fd)
                        var openPath = vscode.Uri.file(pathfile); //A request file path
                        vscode.workspace.openTextDocument(openPath).then(function(val) {
                            vscode.window.showTextDocument(val);
                        });
                    })
                    vscode.window.showInformationMessage('Successfully added a seeder !');
                }else{
                    vscode.window.showWarningMessage("Name already exist !");
                }
            })
        })
    })
}