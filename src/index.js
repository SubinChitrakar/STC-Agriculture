import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cons from 'consolidate';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import routes from './routes';

let app=express();

//Setting the port and host
let APP_PORT = process.env.PORT || 8568;
let APP_HOST = process.env.HOST || 'localhost';

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.use(morgan('dev'));
//Setting View Template
app.engine('dust', cons.dust);

//Setting up View Files and Resource File
app.set('port',APP_PORT);
app.set('host',APP_HOST);
app.set('view engine', 'dust');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static(path.join(__dirname,'public')));

//Setting Up bodyParsers
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:false,limit:'5mb'}));

//Passing the routes to another javascript which acts according to the request
app.use('/', routes);

//To check whether the port is ready to be accessed or not
app.listen(app.get('port'),app.get('host'), function () {
    console.log('Ready, Listening on http://'+app.get('host')+':'+app.get('port'));
});

module.exports = app;