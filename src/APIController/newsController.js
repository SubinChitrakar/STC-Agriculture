import {Router} from 'express';
import * as news from "../service/newsService";

let router=Router();

router.get('/', function (req,res,next) {
    news.readAllNewsDetails()
        .then(response=>{
            res.json({newsList:response});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

export default router;