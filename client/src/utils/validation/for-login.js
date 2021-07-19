import { credentialsMeetConstraints } from './global';

export const AssertAndValidateLogin = data => {
	if (data.password === '') return 'Please enter  a password';
	if (data.email === '') {
		return 'Please enter  an email';
	}
	return credentialsMeetConstraints(data);
};
