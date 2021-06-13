import * as validators from './global';

export const AssertAndValidateDesc = (story, dispatch) => {
	if (!story) {
		dispatch({ type: 'APIACCESS_ERROR', error: 'Provide a Brief Description' });
		return false;
	}
	if (!validators.checkStoryValid(story)) {
		dispatch({
			type: 'APIACCESS_ERROR',
			error: 'Invalid Symptoms Description',
		});
		return false;
	}
	return 1;
};

export const AssertAndValidateAddress = (address, dispatch) => {
	if (!validators.checkAddressValid(address)) {
		dispatch({
			type: 'APIACCESS_ERROR',
			error: 'Invalid Address!',
		});
		return false;
	}
	return true;
};

export const CustomLocationSetuperrors = ({ ward, ...rest }) => {
	switch ('') {
		case rest.county:
			rest.dispatch({ type: 'APIACCESS_ERROR', error: 'select County!' });
			break;
		case rest.subCounty:
			rest.dispatch({ type: 'APIACCESS_ERROR', error: 'select Sub-County!' });
			break;
		case ward:
			rest.dispatch({
				type: 'APIACCESS_ERROR',
				error: 'Provide Your Ward / Location!',
			});
			break;
		default:
			break;
	}
};
export const AssertAndValidatePasscode = (passcode, dispatch) => {
	if (!validators.checkPasswordValid(passcode)) {
		dispatch({ type: 'APIACCESS_ERROR', error: 'Invalid password!' });
		return 0;
	}
	return 1;
};
export const AssertAndValidateReview = (review, dispatch) => {
	if (!review) return false;
	if (!validators.checkStoryValid(review)) {
		dispatch({ type: 'APIACCESS_ERROR', error: 'Invalid User Review !!' });
		return false;
	}
	return true;
};

export function formatPhoneNumber(value) {
	// if input value is falsy eg if the user deletes the input, then just return
	if (!value) return value;
	// clean the input for any non-digit values.
	const phoneNumber = value.replace(/[^\d]/g, '');

	// phoneNumberLength is used to know when to apply our formatting for the phone number
	const phoneNumberLength = phoneNumber.length;

	// we need to return the value with no formatting if its less then four digits
	// this is to avoid weird behavior that occurs if you  format the area code to early

	if (phoneNumberLength < 4) return phoneNumber;

	// if phoneNumberLength is greater than 4 and less the 7 we start to return
	// the formatted number
	if (phoneNumberLength < 6) {
		return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
	}

	// finally, if the phoneNumberLength is greater then seven, we add the last
	// bit of formatting and return it.
	return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
		3,
		5
	)} ${phoneNumber.slice(5, 9)}`;
}
