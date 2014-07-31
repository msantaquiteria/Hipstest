var api = require('./api');

module.exports = function(app) {
	app.param('questionid', api.quiz.loadQuestion);

	// #### API ####
	// Single question
	app.get('/api/question/random', api.quiz.randomQuestion, api.quiz.renderQuestion );
	// Single question
	app.get('/api/question/:questionid', api.quiz.renderQuestion );
	// Fallback
	app.get('/api/*', api.render404 );

	app.get('/', function(req, res) { res.render('home.ejs'); });
}