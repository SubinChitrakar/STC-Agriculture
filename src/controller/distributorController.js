import loginHandler from "../middleware/loginHandler";
import {Router} from "express";
import * as distributor from "../service/distributorService";
import * as user from "../service/userService"

let router = Router();

router.get('/', loginHandler, function (req, res, next) {
    distributor.readAll()
        .then(response => {
            res.render('distributor', {UserName: req.session.username, distributorList: response});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/addDistributor', loginHandler, function (req, res, next) {
    res.render('distributorFormAdd');
});

router.post('/submitDistributor', loginHandler, function (req, res, next) {
    let formData = req.body;
    return distributor.addDistributor(formData)
        .then(response => {
            console.log(response);
            res.redirect('/distributor');
        })
        .catch(err => {
            res.json({data: 'Database Error', error: err})
        });
});

router.delete('/deleteDistributor/:id', loginHandler, function (req, res, next) {
    let id = req.params.id;
    user.deleteUser(id)
        .then(response=>{
            distributor.deleteDistributor(id)
                .then((response) => {
                    res.json(response);
                })
                .catch((err) => {
                    res.status(500).json({error: err});
                })
        })
        .catch((err)=>{
            res.status(500).json({error: err});
        });


});

export default router;