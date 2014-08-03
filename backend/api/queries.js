/*
	Archivo para guardar y comentar las Queries de consulta a la DB y tenerlas centralizadas.
	Para los nombres de las variables usamos un prefijo de 3 letras para indicar que es lo que estamos haciendo
		* UPD_ : para UPDATE
		* SEL_ : para SELECT
		* INS_ : para INSERT
		* DEL_ : para DELETE
*/

// Selecciona una pregunta y los literales asociados a las ids de la misma (id_plan y id_asignatura)
exports.SEL_QUESTION_DATA = "SELECT preg.*, asig.asignatura, plan.plan FROM preguntas preg " +
							"LEFT JOIN asignaturas asig ON preg.id_asignatura = asig.id " +
							"LEFT JOIN planes plan ON preg.id_plan = plan.id " +
							"WHERE preg.id IN (?)";

// Selecciona todas las respuestas para una pregunta dada
exports.SEL_QUESTION_ANSWERS  = "SELECT * FROM respuestas WHERE id_pregunta = ?";

// Selecciona las ids de todas las preguntas disponibles en el sistema
exports.SEL_ALL_QUESTIONS_ID = "SELECT id FROM preguntas";

// Selecciona las ids de todas las preguntas disponibles en el sistema para la asignatura dada
exports.SEL_QUESTIONS_FILTERED_BY_SUBJECT = "SELECT id FROM preguntas WHERE id_asignatura = ?";

// Selecciona toda la informacion disponible para una asignatura
exports.SEL_SUBJECT_DATA = "SELECT * FROM asignaturas WHERE id = ?";

// Selecciona todas las asignaturas disponibles
exports.SEL_ALL_SUBJECTS = "SELECT * FROM asignaturas";