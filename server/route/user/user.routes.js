const auth = require('../../middleware/auth/auth');
const bcrypt = require('bcrypt');
const { User, validate } = require('../../models/user');
const express = require('express');
const router = express.Router();

router.get('/current', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
    res.send(user);
    console.log(req.user);
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });

	if (user) return res.status(400).send('User already registerd');

	user = new User({
		name     : req.body.name,
		email    : req.body.email,
		password : req.body.password
	});

	user.password = await bcrypt.hash(user.password, 8);
	await user.save();

	const token = user.generateAuthToken();
	res.header('x-auth-token', token).send({
		_id      : user._id,
		name     : user.name,
		email    : user.email,
		status   : 'OK',
		redirect : false,
		code     : 200
	});
});

module.exports = router;
