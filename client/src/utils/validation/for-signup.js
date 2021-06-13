import { credentialsMeetConstraints } from './global';

export const AssertAndValidateSignup = (data) => {
	if (data.name === '' || data.email === '' || data.password === '') {
		return 'key in all the fields';
	}
	return credentialsMeetConstraints(data);
};
