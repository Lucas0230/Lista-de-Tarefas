

function Auth( req, res, next) {

    if (req.session.userId != undefined) {

        next();
    
    } else {

        res.redirect('/login');
    }

}


module.exports = Auth;   