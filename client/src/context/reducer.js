let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).vp_P_A
  : '';

let token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).id
  : '';

export const routePass = {
  vet: 'vetsysty674560Fgre6678',
  client: 'vetsystyfgh38895gdtufh',
  vetUpdate: 'vetsyse6678gt8874nmndc',
};

export const initialState = {
  userDetails: '' || user,
  token: '' || token,
  loading: false,
  errorMessage: null,
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
        token: action.payload.id,
        loading: false,
      };
    case 'SIGNUP_SUCCESS':
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
    default:
      throw new Error(`unhandled action type: ${action.type}`);
  }
};
