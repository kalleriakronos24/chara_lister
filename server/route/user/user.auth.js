const express = require('express');
const router = express.Router();
const { User } = require('../../models/user');
const bcrypt = require('bcrypt');
        
const sessionChecker = (req, res, next) => {
    if (!req.session.user && !req.cookies.user_session_id) {
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
}
        router.get('/all_session_data', (req, res) => {
            res.send({
                session_data : req.session.user,
                cookies_id : req.cookies.user_session_id
            })
            console.log(req.session.user);
        })

        router.post('/login', async (req, res) => {

            const email = req.body.email;
            const password = req.body.password;

            await User.findOne({ email }, async (error, user) => {
                console.log(user.password);
                console.log(password);

                if(user){

                    await bcrypt.compare(password, user.password, async (error, result) => {
                        console.log(result);
                        console.log(error);
                        if(result){
                            req.session.user = user;
                            res.send({
                                msg : 'You are now logged in',
                                error : false,
                                data : req.session.user
                            })
                            console.log('Session data >>>>> ', req.session.user)
                            console.log(req.cookies.user_session_id);
                        }
                        else{
                            res.send({
                                msg : 'Cannot find the user',
                                error : {
                                    code : 500,
                                    text : 'test',
                                    redirect : false,
                                    reason : error
                                }
                            })
                        }

                    })

                }
                else{
                    res.send({
                        msg : 'Cannot find the user',
                        error : {
                            code : 500,
                            text : 'qwe',
                            redirect : false,
                            reason : error
                        }
                    })
                }
            })
        })

        router.get('/logout', (req, res) => {
            if(req.session.user && req.cookies.user_session_id)
                res.clearCookie('user_session_id');
                res.send({
                    status : 200,
                    msg : 'Successfully logout',
                    error : false,
                    redirect : false
                })
                console.log(req.cookies.user_session_id);
                console.log(req.session.user);
        })

        router.post('/signup', async (req, res) => {

            const username = req.body.name;

            let user = await User.findOne({ name : username });

            if(user) {
                return res.send({
                msg : 'User Already Exist, try different name',
                error : {
                    is_error : true,
                    code : 400,
                    redirect: false
                }
            })
        }

            user = new User({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                contributor : [],
                createdHero : [],
                savedHero : []
            })
            
	user.password = await bcrypt.hash(user.password, 8);

            await user.save()
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err)
            })

        })
        
module.exports = router;