import {Router} from 'express';
import {verifyUser} from "../service/userService";

let router=Router();

router.post('/login', function (req,res,next) {
    let user = {};
    user.UserName=req.body.username;
    user.Password=req.body.password;
    verifyUser(user)
        .then((response) =>{
            if(response.Status=='Distributor') {
                res.json({message:'Login Successful'});
            }
            else
            {
                res.json({message:'Wrong Credentials'});
            }
        })
        .catch((err)=>{
            res.json({data:'Database Error', error:err});
        })
});

export default router;