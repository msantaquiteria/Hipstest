var api = require('./api');

module.exports = function(app) {
	app.param('questionid', api.quiz.loadQuestion);
	app.param('subjectid', api.quiz.loadSubject);

	// #### API ####
	// Single question
	app.get('/api/question/:questionid([0-9]+)', api.renderResult );
	// Single random question (optionally filtered)
	app.get('/api/question/random/:subjectid([0-9]+)?', api.quiz.randomQuestion, api.renderResult );

	// Single subject
	app.get('/api/subject/:subjectid([0-9]+)', api.renderResult );
	// Subject unfiltered list
	app.get('/api/subject', api.quiz.listSubjects, api.renderResult );

	// API Fallback
	app.get('/api/*', api.render404 );

	app.get('/', function(req, res) { res.render('home.ejs'); });
}