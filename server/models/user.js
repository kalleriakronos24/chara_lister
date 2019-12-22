const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const UserSchema = new Schema({
	name        : {
		type      : String,
		minlength : 6,
		maxlength : 20
	},
	email       : {
		type      : String,
		minlength : 12,
		maxlength : 20
	},
	password    : {
		type      : String,
		minlength : 4,
		maxlength : 100
	},

	contributor : [
		String
	],

	createdHero : [
		{
			type : Schema.Types.ObjectId,
			ref  : 'Hero'
		}
	],

	savedHero   : [
		{
			type : Schema.Types.ObjectId,
			ref  : 'Hero'
		}
	]
});

UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id  : this._id,
			name : this.name
		},
        config.get('secret_key'),
        {
            expiresIn : "2h"
        }
	);
	return token;
};

const User = mongoose.model('User', UserSchema);

const validateUser = (user) => {
	const schema = {
		name     : Joi.string().min(3).max(20),
		email    : Joi.string().min(12).max(20),
		password : Joi.string().min(4).max(100)
	};
	return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;
