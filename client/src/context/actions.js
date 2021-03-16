import { routePass } from './reducer';
const { PORT } = require('../../../config/env');

const ROOT_URL = `http://localhost:${PORT}/auth`;
const requestOptions = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: '',
};

let response;

export async function loginUser(dispatch, loginPayload) {
	const loginUrl = `${ROOT_URL}/log-in`;
	dispatch({ type: 'REQUEST_API' });
	requestOptions.body = JSON.stringify(loginPayload);
	await fetch(loginUrl, requestOptions)
		.then(r => r.json().then(data => (r.ok ? data : Promise.reject(data))))

		.then(
			user => {
				if (user.id) {
					dispatch({ type: 'LOGIN_SUCCESS', payload: user });
					localStorage.setItem('currentUser', JSON.stringify(user));
					response = user;
				} else response = 0;
			},

			err => {
				const sentError = err.error;
				const error = sentError ? sentError : 'servor Not Found';
				dispatch({ type: 'APIACCESS_ERROR', error: error });
				response = 0;
			}
		);

	return response;
}

export async function Signup(dispatch, signupPayload) {
	const signUpUrl = `${ROOT_URL}/sign-up`;
	dispatch({ type: 'REQUEST_API' });
	requestOptions.body = JSON.stringify(signupPayload);
	await fetch(signUpUrl, requestOptions)
		.then(r => r.json().then(data => (r.ok ? data : Promise.reject(data))))

		.then(
			user => {
				if (user) {
					dispatch({ type: 'SIGNUP_SUCCESS' });
					response = 'ok';
				} else response = 0;
			},

			err => {
				const sentError = err.error;
				const error = sentError ? sentError : 'servor Not Found';
				dispatch({ type: 'APIACCESS_ERROR', error: error });
				response = 0;
			}
		);

	return response;
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('currentUser');
	localStorage.removeItem('token');
}
