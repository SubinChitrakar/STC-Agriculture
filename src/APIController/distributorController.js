import {Router} from 'express';
import * as distributor from "../service/distributorService";

let router=Router();

router.get('/', function (req,res,next) {
    distributor.readAll()
        .then(response=>{
            res.json({distributorList:response});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

export default router;