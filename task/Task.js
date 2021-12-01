
const Sequelize = require('sequelize');
const connection = require('../../PlanningOut/database/database');

const List = require('../list/List');

const Task = connection.define('tasks',{

    title: {

        type: Sequelize.STRING,
        allowNull: false
    },
    checked: {

        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }


});

List.hasMany(Task);
Task.belongsTo(List);

Task.sync({force: false})

module.exports = Task;