import { routePass } from './reducer';
import { clearContextErrors } from '../utils';

const ROOT_URL = 'http://localhost:3100';

const requestOptions = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		authorization: '',
	},
	body: '',
};

let response;

export async function UploadData(dispatch, payload, path) {
	dispatch({ type: 'REQUEST_API' });

	requestOptions.body = JSON.stringify(payload);

	requestOptions.headers.authorization = localStorage.getItem('_u')
		? `${JSON.parse(localStorage.getItem('_u')).u}`
		: '';

	await fetch(`${ROOT_URL}${path}`, requestOptions)
		.then((r) => r.json().then((data) => (r.ok ? data : Promise.reject(data))))

		.then(
			(user) => {
				if (user.success) {
					const auth = user.auth;

					let load = {
						vp_P_A: '',
						u: user.token,
					};
					switch (auth) {
						case 'vet':
							load.vp_P_A = routePass.vet;
							//load.vp_P_A = routePass().vet;
							break;
						case 'client':
							load.vp_P_A = routePass.client;
							//load.vp_P_A = routePass().client;
							break;
						case 'update':
							load.vp_P_A = routePass.vetUpdate;
							//load.vp_P_A = routePass().vetUpdate;
							break;
						default:
							load.vp_P_A = '';
					}
					dispatch({ type: 'LOGIN_SUCCESS', payload: load });
					localStorage.setItem('_u', JSON.stringify(load));
					response = load;
				} else if (user.message) {
					dispatch({ type: 'UPLOAD_SUCCESS' });
					response = user;
				}
			},

			(err) => {
				const error = err.error ? err.error : 'server Not Found';
				dispatch({ type: 'APIACCESS_ERROR', error: error });
				response = 0;
			}
		);

	return response;
}

export async function fetchData(dispatch, path) {
	dispatch({ type: 'REQUEST_API' });
	requestOptions.headers.authorization = localStorage.getItem('_u')
		? `${JSON.parse(localStorage.getItem('_u')).u}`
		: '';
	const headers = requestOptions.headers;
	await fetch(`${ROOT_URL}${path}`, { headers })
		.then((r) => r.json())
		.then(
			(data) => {
				response = data;
			},
			(err) => {
				dispatch({ type: 'APIACCESS_ERROR', error: 'connection failed' });
				response = 0;
			}
		);
	return response;
}

export async function makeGETrequest(request_url, dispatch, geocode) {
	await fetch(request_url)
		.then((r) => r.json().then((data) => (r.ok ? data : Promise.reject(data))))

		.then(
			(data) => {
				if (data.status.code === 200) {
					dispatch({ type: 'UPLOAD_SUCCESS' });
					response = geocode
						? data.results[0].geometry
						: data.results[0].formatted;
				} else if (data.status.code <= 500) {
					dispatch({
						type: '3RDPARTYAPIACCESS_ERROR',
						error: data.status.message,
					});
					response = 0;
				} else {
					dispatch({ type: '3RDPARTYAPIACCESS_ERROR', error: 'SERVER ERROR!' });
					response = 0;
				}
			},
			(err) => {
				dispatch({
					type: '3RDPARTYAPIACCESS_ERROR',
					error: 'unable to connect to server',
				});
				response = 0;
			}
		);

	return response;
}

export async function logout(dispatch) {
	clearContextErrors(dispatch);
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('_u');
}
