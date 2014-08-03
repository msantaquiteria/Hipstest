exports.quiz = require('./quiz.js');


exports.renderResult = function(req, res) {
	res.json({ code: 0, data: req.result });
}

exports.render404 = function(req, res) {
	res.json(404, { msg: 404 })
}