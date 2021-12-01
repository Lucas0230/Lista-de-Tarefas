
// Express
const express = require('express');
const app = express();

// Session 
const session = require('express-session');

app.use(session({
    secret:'kdawdnnadwkdamsldsj2k12k3kdandaw',
    cookie: { maxAge: 10800000 }    // 3 horas  // milisegundos
}))

// Database
const connection = require('./database/database');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

connection.authenticate()

    .then(()=>{
        console.log('Conexão com o database funcionou!')
    })
    .catch(()=>{
        console.log('XXXX Algo deu errado com o banco de dados! XXXX')
    })
//

// Controller
const usersController = require('../PlanningOut/user/UsersController');

app.use('/', usersController);

const tasksController = require('../PlanningOut/task/TasksController');

app.use('/', tasksController);

const listsController = require('../PlanningOut/list/ListController');

app.use('/', listsController);

// Model
const User = require('../PlanningOut/user/User')


// View engine 
app.set('view engine', 'ejs');

// Static +
app.use(express.static(__dirname + '/public'));


//Rotas

app.get('/', (req,res)=>{

    res.render('init/landing') 
})



app.listen(7474, ()=>{

    console.log('Servidor rodando!')
})