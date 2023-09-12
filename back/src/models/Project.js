const { DataTypes } = require("sequelize");
const sequilize = require("../database/database");

const Task = require("./Task");

const Project = sequilize.define(
  "projects",
  {
    projectID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

/*
hasMany --> un proyecto tiene muchas tareas
y le decimos que el foreignkey se llamara en task projectID
adicional que viene de projectID de projects
*/

Project.hasMany(Task, {
  foreignKey: "projectID",
  sourceKey: "projectID",
});

/*
ahora crearemos a donde pertenece tareas

Task.belongsTo(Project,{
   foreignKey: "projectID",
    targetID: "projectID",

    como esta es la tabla que va a estar enlazandoce
    en la tabla padre colocamos targetID
})
*/

Task.belongsTo(Project, {
  foreignKey: "projectID",
  targetId: "projectID",
});

module.exports = Project;
