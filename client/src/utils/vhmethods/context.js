export const clearContextErrors = (dispatch) => {
	dispatch({ type: 'APIACCESS_ERROR', error: '' });
};

export const clearLocalStorage = (item) => {
	localStorage.removeItem(item);
};

export const successResponse = (message, dispatch) => {
	dispatch({ type: 'ACTION_SUCCESS', message: message });
};

export const clearSuccessMessage = (dispatch) => {
	function clear() {
		dispatch({ type: 'ACTION_SUCCESS', message: '' });
	}
	clear();
};

export const createContextErrors = (error, dispatch) => {
	dispatch({ type: 'APIACCESS_ERROR', error: error });
};
