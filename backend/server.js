var express = require('express');
var http = require('http');
var path = require('path');
var Sequelize = require("sequelize");

var router = require('./router.js');

var app = express();
app.set('views', path.join(__dirname, '../frontend/views'));
app.set('view engine', 'ejs');
// Rutas estaticas de acceso
app.use('/components', express.static(path.join(__dirname, '../frontend/components/')));
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets/')));

var config = {
	db: {
		user: 'root',
		pass: 'root',
		db_name: 'hiptests',
		dialect: 'mysql'
	},
	port: 3000
}

router(app);

// Prepare the DataBase
global.DB = new Sequelize(config.db.db_name, config.db.user, config.db.pass, {
		dialect: config.db.dialect,
		logging: console.log
	});

// Global Shortcut
global.Query = function(sql, params) {
		return DB.query(sql, null, {raw: true}, params);
	};

// Launch HTTP server
http.createServer(app).listen(config.port, function(){
	console.log('Express server listening on port %d', config.port);
});