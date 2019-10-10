import {Router} from 'express';
import {verifyUser} from '../service/userService';

let router = Router();
router.get('/',function (req,res,next) {
    if(req.session.page_views >1){
        res.redirect('/dashboard');
        return;
    }
    req.session.page_views =1;
    res.render('login');
});

router.post('/login', function (req,res,next) {
    let user = {};
    user.UserName=req.body.username;
    user.Password=req.body.password;
    verifyUser(user)
        .then((response) =>{
            if(response.Status=='Admin') {
                req.session.page_views++;
                req.session.username = user.UserName;
                res.redirect('/dashboard');
            }
            else if (response.Status=='Not Admin')
            {
                res.render('login',{error:'Wrong Credentials'});
            }
            else
            {
                res.render('login',{warning:'Permission Not Granted'});
            }
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

router.get('/logout',function (req,res,next) {
    req.session.page_views = 1;
    res.redirect('/');
});

export default router;