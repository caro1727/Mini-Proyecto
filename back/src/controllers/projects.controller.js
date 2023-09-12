const Project = require("../models/Project");
const Task = require("../models/Task");
/*con la importacion de este modelo ya se puede ejecutar consultas
de crear datos
*/

// see all projects
const getProjects = async (req, res) => {
  try {
    // throw new Error("error get");
    const projects = await Project.findAll();
    //El findALL de todas las filas las recorre y forma un arreglo.

    console.log(projects);

    res.json(projects);
    /* en el res.json, dice que va a enviar un json y vas a mostrar este
        arreglo de proyectos. */
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// see only one project : id
const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findOne({
      where: {
        projectID: id,
      },
    });

    if (!project) return res.status(404).json({ message: "Project no existe" });

    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Create project
const createProject = async (req, res) => {
  try {
    console.log(req.body);
    const { name, priority, description } = req.body;
    const newProject = await Project.create({
      name: name,
      priority: priority,
      description: description,
    });
    console.log(newProject);
    res.json(newProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    //vamos a extraer el id que vienen de req.params

    const { id } = req.params;

    //Estraemos los datos que vienen del req.body
    //con esto vamos a poder actualizar un proyecto
    const { name, priority, description } = req.body;

    //para poder ver si poder actualizar estos datos vamos a ver si los tenemos
    console.log(id);
    console.log(req.body);

    const project = await Project.findByPk(id);
    project.name = name;
    project.priority = priority;
    project.description = description;
    console.log(project);

    //ya conociendo que ha acutalizado ahora vamos a guarduarlo para hacer la consulta

    await project.save(); //con esto lo guarda en la base de datos.

    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    /*utilizando el modelo Project vasmoa a buscar una propiedad
    que nos permite buscar y eliminar al mismo tiempo */
    //vamos a extraer el id que viene de req.params
    const { id } = req.params;
    await Project.destroy({
      where: {
        projectID: id,
      },
    });

    console.log("El id a eliminar es --> " + req.params.id);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get project Tasks

const getProjectTasks = async (req, res) => {
  const { id } = req.params;

  try {
    const tasks = await Task.findAll({
      where: {
        projectID: id,
      },
    });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getProjects = getProjects;
module.exports.createProject = createProject;
module.exports.updateProject = updateProject;
module.exports.deleteProject = deleteProject;
module.exports.getProject = getProject;
module.exports.getProjectTasks = getProjectTasks;
