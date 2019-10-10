import {Router} from 'express';
import loginHandler from '../middleware/loginHandler';
import * as smartTipsService from '../service/smartTipsService';
let router=Router();

router.get('/',loginHandler, function (req,res,next) {
    let tipsList = {};
    smartTipsService.readAllTips()
        .then(response => {
            if(response.length == 0)
            {
                res.render('smartTips', {UserName: req.session.username, status:false});
            }
            else{
                tipsList = response;
                return smartTipsService.readOneTips(tipsList[0].id)
                    .then(response=>{
                        res.render('smartTips', {UserName: req.session.username, tipList: tipsList, tip:response, status: true});
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

router.get('/addTips',loginHandler,function (req,res,next) {
    res.render('smartTipsFormAdd',{UserName: req.session.username});
});

router.get('/getOneTip/:id', loginHandler, function (req, res, next) {
    let id = req.params.id;
    smartTipsService.readOneTips(id)
        .then(response=>{
            res.json({tips:response});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.post('/submitTips', function (req, res, next) {
    let formData=req.body;
    smartTipsService.addTips(formData)
        .then(response=>{
            res.redirect('/smartTips')
        })
        .catch(err=>{
            res.json({data: 'Database Error', error: err})
        })
});

router.put('/updateTips',loginHandler, function (req,res,next) {
    let formData = req.body;
    smartTipsService.updateTips(formData)
        .then(updatedTips =>{
            res.json({data:'Tips Updated'});
        })
        .catch(err =>{
            res.json({data:'Database Error', error: err});
        });
});

router.delete('/deleteTips/:id', loginHandler, function (req, res, next) {
    let id = req.params.id;
    smartTipsService.deleteTips(id)
        .then((response) => {
            res.json({data: response});
        })
        .catch((err) => {
            res.status(500).json({error: err});
        })
});

export default router;