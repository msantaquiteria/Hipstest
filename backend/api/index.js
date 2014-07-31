exports.quiz = require('./quiz.js');

exports.render404 = function(req, res) {
	res.json(1, { msg: 404 })
}