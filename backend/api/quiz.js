var async = require('async');
var Queries = require('./queries.js');

exports.loadQuestion = function(req, res, next, id) {
	async.parallel({
		select_question : function(callback) {
			Query(Queries.SEL_QUESTION_DATA, [ id ])
				.success( function(rows) { callback(null, rows) })
				.error( callback );
		},
		select_answers : function(callback) {
			Query(Queries.SEL_QUESTION_ANSWERS, [ id ])
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

				// Preparamos la variable para el middleware generico de render
				req.result = req.question;
				next();
			}
			else
				res.json(404, {code: 1, msg: "NO_SUCH_QUESTION_ID"});
		}
		else
			res.json(500, {code: 1, msg: err});
	});
}

exports.loadSubject = function(req, res, next, id) {
	Query(Queries.SEL_SUBJECT_DATA, [id])
		.success( function(rows) {
			if (!!rows.length)
			{
				req.subject = rows[0];

				// Preparamos la variable para el middleware generico de render
				req.result = req.subject;
				next();
			}
			else
				res.json(404, {code: 1, msg: "NO_SUCH_SUBJECT_ID"});
		})
		.error( function(err) { res.json(500, {code: 1, msg: err}) } );
}

exports.listSubjects = function(req, res, next) {
	Query(Queries.SEL_ALL_SUBJECTS, [])
		.success( function(rows) { req.result = rows; next() } )
		.error( function(err) { res.json(500, {code: 1, msg: err}) } );
}

exports.randomQuestion = function(req, res, next) {
	Query(Queries.SEL_ALL_QUESTIONS_ID, [])
		.success( function(rows) { exports.loadQuestion(req, res, next, rows[Math.floor(Math.random()*rows.length)].id) } )
		.error( function(err) { res.json(500, {code: 1, msg: err}) } );
}