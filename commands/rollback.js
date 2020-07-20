const shell = require('./functions')

module.exports = async (vscode) => {
    let NEXT_TERM_ID = 1;
    const terminal  = vscode.window.createTerminal(`Laravel Rollback #${NEXT_TERM_ID++}`);
    terminal.sendText("php artisan migrate:rollback");
    vscode.window.showInformationMessage('Successfuly Rollback Migrate')
    shell.closeTerminal(terminal)
}