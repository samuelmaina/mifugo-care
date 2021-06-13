let user = localStorage.getItem('_u')
	? JSON.parse(localStorage.getItem('_u')).vp_P_A
	: '';

let token = localStorage.getItem('_u')
	? JSON.parse(localStorage.getItem('_u')).u
	: '';
function populate() {
	return {
		vet: `v${randstr()}`,
		client: `c${randstr()}`,
		vetUpdate: `u${randstr()}`,
	};
}

export const routePass = populate();
let typeChar = '';
if (user !== undefined) {
	typeChar = user.charAt(0);
}

if (typeChar === 'v') user = routePass.vet;
else if (typeChar === 'c') user = routePass.client;
else if (typeChar === 'u') user = routePass.vetUpdate;

export const initialState = {
	userDetails: '' || user,
	token: '' || token,
	loading: false,
	errorMessage: null,
	remoteErrorMessage: null,
	pass: routePass,
	view: null,
	clientInitCoords: null,
	successMessage: '',
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_API':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				userDetails: action.payload.vp_P_A,
				token: action.payload.u,
				loading: false,
			};
		case 'UPLOAD_SUCCESS':
			return {
				...initialState,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...initialState,
				userDetails: '',
				token: '',
			};
		case 'APIACCESS_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};
		case '3RDPARTYAPIACCESS_ERROR':
			return {
				...initialState,
				loading: false,
				remoteErrorMessage: action.error,
			};
		case 'NAVIGATION':
			return {
				...initialState,
				view: action.view,
			};
		case 'GEOLOCATION':
			return {
				...initialState,
				clientInitCoords: action.init,
			};
		case 'TEST':
			return {
				...initialState,
				loading: true,
			};
		case 'ACTION_SUCCESS':
			return {
				...initialState,
				successMessage: action.message,
				loading: false,
			};
		default:
			throw new Error(`unhandled action type: ${action.type}`);
	}
};

function randstr() {
	return Array(5)
		.fill(null)
		.map(() => Math.random().toString(36).substr(2))
		.join('');
}
