
const express = require('express');
const router = express.Router();

const Task = require('../task/Task');

const List = require('../list/List');

const Auth = require('../middlewares/Auth')


router.post('/task/save/:slug/:id', (req, res)=>{

    var title = req.body.title; 
    var listId = req.params.id;


    Task.create({ 

        title: title,
        listId : listId

    }).then(()=>{

        // voltar para a página do mesmo projeto

        res.redirect('back')

    }).catch(err =>{

        res.redirect('/task/create')
    })

})

router.post('/task/delete', (req, res)=>{

    var id = req.body.id;

    Task.destroy({
        where: {
            id: id
        }
    }).then(()=>{

        res.redirect('back')
    })
})


router.get('/task/check/:id', (req, res)=>{

    var id = req.params.id;


    Task.update({checked: true},{
        where: {
            id: id
        }
    }).then(()=>{

        res.redirect('back')

    })
})


// ROTAS PRINCIPAIS

router.get('/tasks', Auth , (req, res)=>{

    List.findAll({

        where: {

            userId : req.session.userId
        }

    }).then( lists =>{

        res.render('page', {lists: lists})
        
    })


})

router.get('/tasks/:slug', Auth ,(req, res)=>{

    var slug = req.params.slug;

    List.findOne({
        where : {
            slug: slug
        },
        include: [{model: Task}],
        order: [
            ['id','DESC']
        ]

    }).then( list =>{

        //Todos para a sidebar
        List.findAll({

            where: {

                userId : req.session.userId
            }

        }).then( lists =>{

            res.render('index', {list: list,tasks: list.tasks, lists : lists})
        })

    } )
    
})



module.exports = router;