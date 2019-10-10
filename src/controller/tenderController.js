import {Router} from 'express';
import loginHandler from "../middleware/loginHandler";
import * as fertilizer from "../service/fertilizerService";
import * as tender from "../service/tenderService";
import * as tenderDetails from "../service/tenderDetailServices";

let router = Router();

router.get('/', loginHandler, function (req, res, next) {
    return tender.readAll()
        .then(tenderList => {
            res.render('tender', {UserName: req.session.username, tenderList: tenderList});
        })
        .catch(err => {
            res.json({data: 'Database Error', error: err});
        });

});

router.get('/addTender', loginHandler, function (req, res, next) {
    return fertilizer.readAllFertilizer()
        .then(fertilizerList => {
            res.render('tenderFormAdd', {UserName: req.session.username, fertilizerList: fertilizerList});
        })
        .catch(err => {
            res.json({data: 'Database Error', error: err});
        });

});

router.post('/submitTender', loginHandler, function (req, res, next) {
    let formData = req.body;
    return tender.addTender(formData)
        .then(fertilizer => {
            res.redirect('/tender');
        })
        .catch(err => {
            res.json({data: 'Database Error', error: err})
        });
});

router.get('/tenderDetails/:id', loginHandler, function (req, res, next) {
    let id = req.params.id;
    let tenderInfo = {};
    let fertilizers = {};
    return tender.readOneTender(id)
        .then(tender =>{
            tenderInfo = tender;
            return fertilizer.readAllFertilizer();
        })
        .then(res=>{
            fertilizers = res;
            return tenderDetails.readTenderDetailFromTenderId(id);
        })
        .then(tenderDetails=>{
            res.render('tenderDetails', {UserName: req.session.username, tender: tenderInfo[0], tenderDetails:tenderDetails, fertilizerList:fertilizers});
        })
        .catch(err => {
            res.json({data: 'Database Error', error: err});
        });
});

router.put('/submitUpdatedTender',loginHandler, function (req,res,next) {
    let formData = req.body;
    let id = formData.tenderId;
    tender.updateTender(formData)
        .then(updatedTender =>{
            res.json({data:'Tender Updated', id:id});
        })
        .catch(err =>{
            res.json({data:'Database Error', error: err});
        });
});


router.delete('/deleteTender/:id', loginHandler, function (req, res, next) {
    let id = req.params.id;
    tender.deleteTender(id)
        .then((response) => {
            res.json({data: response});
        })
        .catch((err) => {
            res.status(500).json({error: err});
        })
});


export default router;