var async = require('async');

exports.loadQuestion = function(req, res, next, id) {
	async.parallel({
		select_question : function(callback) {
			var query = "SELECT preg.*, asig.asignatura, plan.plan FROM preguntas preg " +
						"LEFT JOIN asignaturas asig ON preg.id_asignatura = asig.id " +
						"LEFT JOIN planes plan ON preg.id_plan = plan.id " +
						"WHERE preg.id = ?";

			Query(query, [ id ])
				.success( function(rows) { callback(null, rows) })
				.error( callback );
		},
		select_answers : function(callback) {
			Query("SELECT * FROM respuestas WHERE id_pregunta = ?", [ id ])
				.success( function(rows) { callback(null, rows) })
				.error( callback );
		}
	},
	function(err, results) {
		if (!err)
		{
			if (results.select_question.length > 0 && results.select_answers.length > 0)
			{
				req.question = results.select_question[0];
				req.question.answers = results.select_answers;
				next();
			}
			else
				res.json(404, {code: 1, msg: "NO_SUCH_QUESTION_ID"});
		}
		else
			res.json(500, {code: 1, msg: err});
	});
}

exports.randomQuestion = function(req, res, next) {
	Query("SELECT id FROM preguntas", [])
		.success( function(rows) { exports.loadQuestion(req, res, next, rows[Math.floor(Math.random()*rows.length)].id) });
}

exports.renderQuestion = function(req, res) {
	res.json({ code: 0, data: req.question });
}