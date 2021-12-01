
const express = require('express');
const router = express.Router();

const slugify = require('slugify')

const List = require('../list/List');
const Task = require('../task/Task');

const Auth = require('../middlewares/Auth')


router.get('/list/new', Auth,  (req, res)=>{

    res.render('list/new')
})

router.post('/list/save', (req, res)=>{

    var title = req.body.title;
    var body = req.body.body;
    var userId = req.session.userId;

    List.create({

        title : title,
        body : body,
        slug: slugify(title),
        userId : userId

    }).then(()=>{

        res.redirect('/tasks')

    }).catch(err =>{

        res.redirect('/list/new')
    })

})

router.get('/list/delete/:id', (req,res)=>{

    var id = req.params.id;

    List.destroy({
        where: {
            id: id
        }
    }).then(()=>{

        res.redirect('/tasks')
    })
})


module.exports = router;
