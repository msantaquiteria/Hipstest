var ejs = require('ejs');
var fs = require('fs');

exports.render = {};
exports.render.home = function(req, res, next) {
	res.send(render('home'));
}

function render(path) {
	var filePath = app.get('views').replace(/\/$/,'') + '/' + path.replace(/^\//, '') + '.ejs';
	return ejs.render(loadTemplate(filePath), { filename: filePath });
}

function loadTemplate(filePath) {
	var template = fs.readFileSync(filePath, 'utf8');

	if ( app.get('url_append').length )
		template = template.replace(/(src|href)=(['"])\//g, "$1=$2/" + app.get('url_append') + "/")

	// template = template.replace(/[\t\r\n]/, '');
	return template;
}