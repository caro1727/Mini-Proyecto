const express = require("express");
const router = express.Router();

//Importamos los controllers

const { getProjects, createProject, updateProject, deleteProject, getProject, getProjectTasks } = require("../controllers/projects.controller");

//definimos las rutas

router.get("/projects", getProjects); //obtener
router.post("/projects", createProject); //crear
router.put("/projects/:id", updateProject); //actualizar un solo proyecto
router.delete("/projects/:id", deleteProject); //eliminar un solo proyecto
router.get("/projects/:id", getProject); // obtener un solo proyecto

//traer las tasks de un project
router.get("/projects/:id/tasks", getProjectTasks); // obtener un solo proyecto

module.exports = router;
