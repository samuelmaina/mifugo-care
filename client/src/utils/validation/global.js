export const checkPasswordValid = (pass) => {
	var regE = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,24}/;
	return regE.test(pass);
};

export const checkEmailValid = (email) => {
	var regE = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return regE.test(email);
};

export const checkStoryValid = (story) => {
	var regE = /^[a-zA-Z0-9 .'"?&!,-_@\n\r]{9,500}$/;
	return regE.test(story);
};

export const checkUrlValid = (url) => {
	var regE =
		/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
	return regE.test(url);
};

export const checkAddressValid = (address) => {
	var regE = /^[a-zA-Z0-9 .'"?&!,-_@\n\r]{5,60}$/;
	return regE.test(address);
};

export const credentialsMeetConstraints = (data) => {
	if (!checkPasswordValid(data.password)) {
		return 'invalid password';
	}
	if (!checkEmailValid(data.email)) {
		return 'invalid email';
	}
	return 'valid';
};

export const randStr = () => {
	console.log('called');
	return Array(5)
		.fill(null)
		.map(() => Math.random().toString(36).substr(2))
		.join('');
};
