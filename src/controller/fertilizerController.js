import {Router} from 'express';
import loginHandler from '../middleware/loginHandler';
import cloudinary from 'cloudinary';
import multipart from 'connect-multiparty';
import * as fertilizer from '../service/fertilizerService'

let router=Router();

cloudinary.config({
    cloud_name: 'dipdbsfcd',
    api_key: '752931941282837',
    api_secret: 'aMCTcOespn2yPIXhGxwtHrLXbZg'
});

let multipartMiddleware = multipart();

router.get('/',loginHandler, function (req,res,next) {
    fertilizer.readAll()
        .then(response=>{
            res.render('fertilizer', {UserName: req.session.username, fertilizerList: response});
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/addFertilizer',loginHandler,function (req,res,next) {
    res.render('fertilizerFormAdd',{UserName: req.session.username});
});

router.post('/submitFertilizer',loginHandler,multipartMiddleware,function (req,res,next) {
    let formData=req.body;
    const imageFile = req.files.image.path;

    cloudinary.v2.uploader.upload(imageFile, {tags: 'express_sample'})
        .then(image =>{
            formData.image = image.url;
            return fertilizer.addFertilizer(formData)
        })
        .then(addedFertilizer =>{
            res.redirect('/fertilizer');
        })
        .catch(err =>{
            res.json({data:'Database Error', error: err});
        });
});

router.get('/updateFertilizer/:id',loginHandler,function (req,res,next) {
    let fertilizerId = req.params.id;
    fertilizer.getFertilizerFromId(fertilizerId)
        .then(response=>{
            res.render('fertilizerFormUpdate',{UserName: req.session.username, fertilizer:response});
        })
        .catch(err=>{
            res.json({data:'Database Error', error:err});
        })
});

router.put('/submitUpdatedFertilizer',loginHandler, multipartMiddleware, function (req,res,next) {
    let formData = req.body;
    let image = req.files;
    if(formData.count>1)
    {
        let componentList = req.body.components;
        formData.component = componentList.split(',');

        let percentageList = req.body.percentages;
        formData.percentage = percentageList.split(',');
    }
    else{
        formData.component = req.body.components;
        formData.percentage = req.body.percentages;
    }


    if(JSON.stringify(image) === JSON.stringify({}))
    {
        return fertilizer.updateFertilizer(formData)
            .then(updatedFertilizer =>{
                res.json({data:'Fertilizer Updated'});
            })
    }
    else{
        cloudinary.v2.uploader.upload(image.files.path, {tags: 'express_sample'})
            .then(uploadImage =>{
                formData.image = uploadImage.url;
                return fertilizer.updateFertilizer(formData);
            })
            .then(updatedFertilizer =>{
                res.json({data:'Fertilizer Updated'});
            })
            .catch(err =>{
                res.json({data:'Database Error', error: err});
            });
    }
});

router.delete('/deleteFertilizer/:id',loginHandler,function (req,res,next) {
    let id=req.params.id;
    fertilizer.deleteFertilizer(id)
        .then((response)=>{
            res.json({data:response});
        })
        .catch((err)=>{
            if(err === 'Cannot be Deleted')
            {
                res.status(500).json({error:err});
            }
            else {
                res.status(500).json({error:err});
            }
        })
});

export default router;