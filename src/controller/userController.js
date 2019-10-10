import {Router} from 'express';
import * as mailer from 'nodemailer';
import * as user from "../service/userService";

let router = Router();

let transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chitrakarsubin07@gmail.com',
        pass: 'digital123.!!!'
    }
});

router.get('/createUser/:id&&:email', function (req, res, next) {
    let distributorId = req.params.id;
    let distributorEmail = req.params.email;
    user.searchByDistributorId(distributorId)
        .then((response) => {
            if (response == undefined) {
                return user.createUser(distributorId, distributorEmail)
                    .then(newUserDetail => {
                        res.json({userDetails: newUserDetail[0], message: 'New User Created'});
                    })
                    .catch((err) => {
                        res.json({data: 'Database Error', error: err});
                    })
            } else {
                res.json({userDetails: response, message: 'Existing User'});
            }
        })
        .catch((err) => {
            res.json({data: 'Database Error', error: err});
        })
});

router.get('/sendEmail/:email&&:password', function (req,res,next) {
    let email = req.params.email;
    let password = req.params.password;

    let mailOptions = {
        from: 'chitrakarsubin07@gmail.com',
        to: email,
        subject: 'Credentials for STC App',
        text: 'Respected Sir/Ma\'am, \n' +
            'The credentials for you STC App are below: \n \n' +
            'Username: '+email+'\n' +
            'Password: '+password
    };

    transporter.sendMail(mailOptions)
        .then(response=>{
            res.json({data: 'Email Send Successfully'});
        })
        .catch(err=>{
            res.json({data: 'Email Not Send', error: err});
        })
});

export default router;