const express = require('express');
const router = express.Router();

const User = require('../user/User');

const bcrypt = require('bcryptjs');


router.get('/create', (req,res)=>{

    res.render('user/create')
})

router.post('/user/create', (req,res)=>{

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    User.create({

        name: name,
        email: email,
        password: password

    }).then(()=>{

        res.redirect('/tasks')
    
    }).catch( err =>{

        res.redirect('user/create')
    })

})

router.get('/login', (req, res)=>{

    if (req.session.userId == undefined) {

        res.render('user/login')

    } else {

        res.redirect('/tasks')
    }

    
})


router.post('/login/authenticate', (req,res)=>{

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then( user =>{

        if (user != undefined){

    
            if (user.password == password) {

                // Criar sessão

                req.session.userId = user.id 

                req.session.username = user.name

                //middleware

                res.redirect('/tasks')
                
            } else {

                res.redirect('/login')
            }

        } else {
            res.redirect('/login')
        }
    })


})

router.get('/logout', (req,res)=>{

    req.session.userId = undefined

    res.redirect('/')
})




module.exports = router;