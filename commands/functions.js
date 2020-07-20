// Capitalze for Controller
module.exports.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
// Lead Zero Hours
module.exports.leadZeroHours = function(dt) { 
	var date 	= new Date(dt)
	return (date.getHours() < 10 ? '0' : '') + date.getHours();
}
// Lead Zero Minute
module.exports.leadZeroMinute = function (dt) { 
	return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}
// Lead Zero Second
module.exports.leadZeroSecond = function (dt) { 
	return (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();
}
// ensure Terminal exist
module.exports.closeTerminal = function (terminal){
	terminal.dispose()
}