import {Router} from 'express';
import loginHandler from '../middleware/loginHandler';
import * as newsService from '../service/newsService';
let router=Router();

router.get('/',loginHandler, function (req,res,next) {
    let newsList = {};
    newsService.readAllNews()
        .then(response => {
            if(response.length == 0)
            {
                res.render('news', {UserName: req.session.username, status:false});
            }
            else{
                newsList = response;
                return newsService.readOneNews(newsList[0].id)
                    .then(response=>{
                        res.render('news', {UserName: req.session.username, newsList: newsList, news:response, status: true});
                    })
                    .catch((err) => {
                        res.json({data: 'Database Error', error: err});
                    })
            }
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/addNews',loginHandler,function (req,res,next) {
    res.render('newsFormAdd',{UserName: req.session.username});
});

router.get('/getOneNews/:id', loginHandler, function (req, res, next) {
   let id = req.params.id;
   newsService.readOneNews(id)
       .then(response=>{
           res.json({news:response});
       })
       .catch((err) => {
           res.json({data: 'Database Error', error: err});
       })
});

router.post('/submitNews', function (req, res, next) {
    let formData=req.body;
    newsService.addNews(formData)
        .then(response=>{
            res.redirect('/news')
        })
        .catch(err=>{
            res.json({data: 'Database Error', error: err})
        })
});

router.put('/updateNews',loginHandler, function (req,res,next) {
    let formData = req.body;
    newsService.updateNews(formData)
        .then(updatedNews =>{
            res.json({data:'News Updated'});
        })
        .catch(err =>{
            res.json({data:'Database Error', error: err});
        });
});

router.delete('/deleteNews/:id', loginHandler, function (req, res, next) {
    let id = req.params.id;
    newsService.deleteNews(id)
        .then((response) => {
            res.json({data: response});
        })
        .catch((err) => {
            res.status(500).json({error: err});
        })
});

export default router;