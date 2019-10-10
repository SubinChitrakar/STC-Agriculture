import {Router} from 'express';
import * as tips from "../service/smartTipsService";

let router=Router();

router.get('/', function (req,res,next) {
    tips.readAllTipsDetails()
        .then(response=>{
            res.json({tipList:response});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

export default router;