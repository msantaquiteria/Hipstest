exports.quiz = require('./quiz.js');

exports.render404 = function(req, res) {
	res.json(404, { msg: 404 })
}