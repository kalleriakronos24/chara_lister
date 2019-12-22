const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(session({
    key: 'user_session_id',
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

app.use((req, res, next) => {
    if (req.cookies.user_session_id && !req.session.user) {
        res.clearCookie('user_session_id');        
    }
    next();
});

const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_session_id) {
        res.sendStatus(500).send({
            msg : 'Something went wrong',
            error : {
                code : 500,
                redirect : false
            }
        })
    } else {
        next();
    }    
};

app.route('/login', (req, res, next) => {

})


app.get('/logout', (req, res, next) => {
    if (req.session.user && req.cookies.user_session_id) {
        res.clearCookie('J_1010');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
})

app.use((req, res, next) => {
    res.sendStatus(404).send({
        msg : "Cannot find the routes",
        error : {
            code : 404,
            redirect : false
        }
    })
})