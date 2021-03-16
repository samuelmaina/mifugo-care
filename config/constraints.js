exports.mongooseId = 24;
exports.auth = {
	name: {
		minlength: 5,
		maxlength: 20,
		error: stringErrorGenerator('Name', 5, 20),
	},
	email: {
		minlength: 8,
		maxlength: 25,
		error: stringErrorGenerator('Email', 8, 25),
	},
	password: {
		minlength: 8,
		maxlength: 15,
		error: stringErrorGenerator('Password', 8, 15),
	},
	tel: 13,
};

exports.tokenGen = {
	token: 64,
};

function stringErrorGenerator(field, minlength, maxlength) {
	return `${field} must be ${minlength} to ${maxlength} characters long.`;
}
