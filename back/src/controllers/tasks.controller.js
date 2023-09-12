const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { name, done, projectID } = req.body;

    const newTask = await Task.create({
      name: name,
      done: done,
      projectID: projectID,
      /*
      con projectID es para relacionar a que id vamos a asignar esta
      tarea en particular. Como es una foreignKey
      */
    });
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findAll({
      where: {
        projectID: id,
      },
    });
    if (!task) return res.status(404).json({ message: "task no existe" });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, done } = req.body;

  try {
    const task = await Task.findOne({
      where: {
        taskID: id,
      },
    });
    task.name = name;
    task.done = done;
    console.log(task);
    await task.save();
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.destroy({
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

module.exports.getTasks = getTasks;
module.exports.createTask = createTask;
module.exports.getTask = getTask;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
