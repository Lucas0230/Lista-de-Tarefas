
const Sequelize = require('sequelize')
const connection = require('../database/database');

const User = require('../user/User')

const List = connection.define('lists',{

    title : {
        type: Sequelize.STRING,
        allowNull: false
    },
    body : {

        type: Sequelize.STRING,
        allowNull: true
    },
    slug : {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId : {

        type: Sequelize.INTEGER,
        allowNull: false
    }
})



List.sync({force: false}) 


module.exports = List;