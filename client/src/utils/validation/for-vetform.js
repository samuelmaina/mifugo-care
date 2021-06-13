import * as validators from './global';

export const checkVetFormsubmitErrors = (inputs, view, dispatch) => {
	if (view === 0) {
		switch ('') {
			case inputs.experience:
				dispatch({
					type: 'APIACCESS_ERROR',
					error: 'Select your level of experience!',
				});
				return 0;
			case inputs.speciality:
				dispatch({
					type: 'APIACCESS_ERROR',
					error: 'Select Category!',
				});
				return 0;
			default:
				break;
		}

		return checkVetFormUrlValid(inputs, dispatch);
	} else if (view === 1) {
		switch (0) {
			case inputs.resume.length:
				dispatch({
					type: 'APIACCESS_ERROR',
					error: 'Please provide your resume!',
				});
				return 0;
			case inputs.certifications.length:
				dispatch({
					type: 'APIACCESS_ERROR',
					error: 'Please provide your Certification documents!',
				});
				return 0;
			default:
				break;
		}
		return true;
	} else if (view === 2) {
		switch (0) {
			case inputs.location.length:
				dispatch({
					type: 'APIACCESS_ERROR',
					error: 'We need have your Location!',
				});
				return 0;
			default:
				break;
		}
		return true;
	}
};

const checkVetFormUrlValid = (inputs, dispatch) => {
	if (inputs.linkedIn && !validators.checkUrlValid(inputs.linkedIn)) {
		dispatch({
			type: 'APIACCESS_ERROR',
			error: 'Invalid Url!',
		});
		return 0;
	}
	return true;
};

export const checkVetFormAddressValid = (inputs, dispatch) => {
	if (!validators.checkAddressValid(inputs.ward)) {
		dispatch({
			type: 'APIACCESS_ERROR',
			error: 'Invalid area Ward / location!',
		});
		return 0;
	}
	return true;
};
