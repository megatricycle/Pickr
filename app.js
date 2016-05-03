import express from 'express';
import session from 'express-session';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import redis from 'redis';
const client = redis.createClient();

// var redisStore = require('connect-redis')(session);
import connect from 'connect-redis';
const redisStore = connect(session);

import student from './routes/student';
import sample from './routes/sample';
import account from './routes/account';
import activity from './routes/activity';
import classRoute from './routes/class';
import volunteer from './routes/volunteer';

let app = express();

app.set('view engine', 'ejs');

app.use(session({
    secret: 'PUT01SL0V3_PUT01SL1F3',
    resave: false,
    saveUninitialized: false,
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/sample', sample);
app.use('/api/account', account);
app.use('/api/class', activity);
app.use('/api/account/', classRoute);
app.use('/api/class', student);
app.use('/api/volunteer', volunteer);

// 404 for api
app.get('/api/*', (req, res) => {
    res.sendStatus(404);
});

// send routing to client
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

export default app;
