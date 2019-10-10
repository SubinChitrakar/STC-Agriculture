import {Router} from 'express';
import * as fertilizer from "../service/fertilizerService";

let router=Router();

router.get('/', function (req,res,next) {
    fertilizer.readAll()
        .then(fertilizerList=>{
            return fertilizer.generateList(fertilizerList);
        })
        .then(response=>{
            res.json({fertilizerList:response});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

export default router;