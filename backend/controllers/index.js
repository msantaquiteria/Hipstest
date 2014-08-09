var ejs = require('ejs');
var fs = require('fs');

exports.render = {};
exports.render.home = function(req, res, next) {
	res.end(ejs.render(loadTemplate('home')));
}

function loadTemplate(path) {
	var filePath = app.get('views').replace(/\/$/,'') + '\\' + path.replace(/^\//, '') + '.ejs';
	var template = fs.readFileSync(filePath, 'utf8');

	if ( app.get('url_append').length )
		template = template.replace(/(src|href)=(['"])\//g, "$1=$2/" + app.get('url_append') + "/")

	return template;
}	