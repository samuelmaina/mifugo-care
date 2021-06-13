import { createContext, useContext, useReducer } from 'react';
import { AuthReducer, initialState } from './reducer';

const AuthStateContext = createContext();

const AuthDispatchContext = createContext();
let pass = {};
export const useAuthState = () => {
	const context = useContext(AuthStateContext);

	if (context === undefined) {
		throw new Error('use AuthState must be used within a AuthProvider');
	}

	return context;
};

export const useAuthDispatch = () => {
	const context = useContext(AuthDispatchContext);

	if (context === undefined) {
		throw new Error('useAuthDispatch must be used only in a AuthProvider');
	}

	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, dispatch] = useReducer(AuthReducer, initialState);

	pass = user;
	/**
	 * Capture Browser Refresh Action And update web Storage
	 */
	if (localStorage.getItem('_u')) {
		localStorage.setItem(
			'_u',
			JSON.stringify({ vp_P_A: user.userDetails, u: user.token })
		);
	}
	return (
		<AuthStateContext.Provider value={user}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};

export const Routes = () => pass.pass;
