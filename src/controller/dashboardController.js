import {Router} from 'express';
import loginHandler from '../middleware/loginHandler';

let router=Router();
router.get('/',loginHandler, function (req,res,next) {
    res.render('dashboard',{UserName: req.session.username});
});

export default router;