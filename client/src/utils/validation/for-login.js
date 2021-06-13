import { credentialsMeetConstraints } from './global';

export const AssertAndValidateLogin = (data) => {
	if (data.password === '' || data.email === '') {
		return 'null fields';
	}
	return credentialsMeetConstraints(data);
};
