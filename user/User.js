const Sequelize = require('sequelize');
const connection = require('../database/database');

const List = require('../list/List')

const User = connection.define('users', {

    name : {

        type: Sequelize.STRING,
        allowNull: false
    },
    email: {

        type: Sequelize.STRING,
        allowNull: false
    },
    password: {

        type: Sequelize.STRING,
        allowNull: false
    }

})


User.sync({force: false})

module.exports = User;