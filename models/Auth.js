const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ranges = require('../config/constraints').auth;

const Schema = mongoose.Schema;

const baseOptions = {
	discrimatorKeys: 'memberToAuth',
	collection: '',
};

const Auth = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: ranges.name.minlength,
			maxlength: ranges.name.maxlength,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			minlength: ranges.email.minlength,
			maxlength: ranges.email.maxlength,
		},
		password: {
			type: String,
			required: true,
			maxlength: 80,
			minlength: 10,
		},
	},
	baseOptions
);

const { statics, methods } = Auth;

statics.createOne = async function (data) {
	const { name, password, email } = data;
	const hashedPassword = await hashPassword(password);
	const newMember = new this({
		name,
		email,
		password: hashedPassword,
	});
	return await newMember.save();
};

statics.findByEmail = async function (email) {
	return await this.findOne({ email });
};

statics.findOneWithCredentials = async function (email, password) {
	const member = await this.findByEmail(email);
	if (!member) {
		return null;
	}
	const doMatch = await member.isCorrect(password);
	if (doMatch) return member;
	else return null;
};

methods.isCorrect = async function (password) {
	return await confirmPassword(password, this.password);
};

methods.update = async function (field, data) {
	if (field === 'password') {
		data = await hashPassword(data);
	}
	this.set(field, data);
	return await this.save();
};
methods.updateMany = async function (data) {
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			await this.update(key, data[key]);
		}
	}
};

methods.deleteAccount = async function () {
	await this.deleteOne();
};

async function hashPassword(plain) {
	return await bcrypt.hash(plain, 12);
}
async function confirmPassword(plain, hash) {
	return await bcrypt.compare(plain, hash);
}
module.exports = mongoose.model('Auth', Auth);
