const vscode 	= require('vscode');
const fs	 	= require('fs')
const path	 	= require('path');
const migration	= require('./commands/migration');
const controller= require('./commands/controller');
const model		= require('./commands/model');
const migrate	= require('./commands/migrate');
const rollback	= require('./commands/rollback');
const serve		= require('./commands/serve');
const seeder	= require('./commands/seeder');
const router	= require('./commands/route');

let pathwork = vscode.workspace.workspaceFolders[0].uri.fsPath;

function activate(context) {

	let laravel_migration 	= vscode.commands.registerCommand('laravel.migration', function () {
		migration(vscode, fs, pathwork, path)
	});
	let laravel_controller 	= vscode.commands.registerCommand('laravel.controller', function () {
		controller(vscode, fs,pathwork, path)
	});
	let laravel_model 		= vscode.commands.registerCommand('laravel.model', function () {
		model(vscode, fs,pathwork, path)
	});
	let laravel_migrate		= vscode.commands.registerCommand('laravel.migrate', function () {
		migrate(vscode)
	})
	let laravel_migrate_roll	= vscode.commands.registerCommand('laravel.migrate.rollback', function () {
		rollback(vscode)
	})
	let laravel_start_serve	= vscode.commands.registerCommand('laravel.serve.start', function () {
		serve.start(vscode)
	})
	let laravel_stop_serve	= vscode.commands.registerCommand('laravel.serve.stop', function () {
		serve.stop(vscode)
	})
	let laravel_restart_serve	= vscode.commands.registerCommand('laravel.serve.restart', function () {
		serve.restart(vscode)
	})
	let laravel_seeder		= vscode.commands.registerCommand('laravel.seeder', function () {
		seeder(vscode,fs,pathwork,path)
	})
	let laravel_router		= vscode.commands.registerCommand('laravel.router', function () {
		router(vscode,fs,pathwork,path)
	})
	let laravel_run_seed	= vscode.commands.registerCommand('laravel.seed', function () {
		router(vscode,fs,pathwork,path)
	})
	
	context.subscriptions.push(laravel_migration);
	context.subscriptions.push(laravel_controller);
	context.subscriptions.push(laravel_model);
	context.subscriptions.push(laravel_migrate);
	context.subscriptions.push(laravel_migrate_roll);
	context.subscriptions.push(laravel_start_serve);
	context.subscriptions.push(laravel_stop_serve);
	context.subscriptions.push(laravel_restart_serve);
	context.subscriptions.push(laravel_seeder);
	context.subscriptions.push(laravel_router);
	context.subscriptions.push(laravel_run_seed);
	// context.subscriptions.push(laravel_livewire_component);

}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
