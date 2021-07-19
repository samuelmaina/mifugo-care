import { credentialsMeetConstraints } from './global';

export const AssertAndValidateSignup = data => {
	if (data.name === '') {
		return 'Enter name';
	}
	if (data.email === '') {
		return 'Enter Email';
	}
	if (data.password === '') {
		return 'Please enter password';
	}

	return credentialsMeetConstraints(data);
};
