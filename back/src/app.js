const express = require("express");
const projectsRoutes = require("./routes/projects.routes");
const tasksRoutes = require("../src/routes/tasks.routes");

const app = express();

//middlewares

app.use(express.json());
/*con la linea anterior vamos a decirle a express que use un middleware
llamado json.  Esta linea va a permitir que cada vez que se envie un
dato en formato json el servidor va a poder interpretarlo y lo va a guardar
dentro de un req.body
*/

app.use(projectsRoutes);
app.use(tasksRoutes);

module.exports = app;
