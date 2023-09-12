const express = require("express");
const router = express.Router();

//Importamos los controllers

const { getTasks, createTask, getTask, deleteTask, updateTask } = require("../controllers/tasks.controller");

//Definimos las rutas

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.get("/tasks/:id", getTask);

module.exports = router;
