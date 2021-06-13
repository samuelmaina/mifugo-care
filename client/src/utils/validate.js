export const AssertAndValidateLogin = (data) => {
	if (data.password === '' || data.email === '') {
		return 'null fields';
	}
	return credentialsMeetConstraints(data);
};

export const AssertAndValidateSignup = (data) => {
	if (data.name === '' || data.email === '' || data.password === '') {
		return 'key in all the fields';
	}
	return credentialsMeetConstraints(data);
};

const credentialsMeetConstraints = (data) => {
	if (!checkPasswordValid(data.password)) {
		return 'invalid password';
	}
	if (!checkEmailValid(data.email)) {
		return 'invalid email';
	}
	return 'valid';
};

const checkPasswordValid = (pass) => {
	var regE = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	return regE.test(pass);
};

const checkEmailValid = (email) => {
	var regE = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return regE.test(email);
};

const checkStoryValid = (story) => {
	var regE = /^[a-zA-Z0-9 .'"?&!,-_@\n\r]{9,500}$/;
	return regE.test(story);
};

const checkUrlValid = (url) => {
	var regE =
		/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
	return regE.test(url);
};

const checkAddressValid = (address) => {
	var regE = /^[a-zA-Z0-9 .'"?&!,-_@\n\r]{5,60}$/;
	return regE.test(address);
};

export const randStr = () => {
	return Array(5)
		.fill(null)
		.map(() => Math.random().toString(36).substr(2))
		.join('');
};

export const monitorFilesInput = (e, setFiles, seed, maxsize, limit) => {
	function nullandvoid(e) {
		e.target.value = null;
		seed.images
			? setFiles({ ...seed, images: [] })
			: setFiles({ ...seed, certifications: [] });
	}

	const Files = e.target.files;
	if (Files.length > limit) {
		alert(`You can only upload a maximum of ${limit} Files `);
		nullandvoid(e);
	} else {
		for (let file = 0; file < Files.length; file++) {
			if (Files[file].size > maxsize) {
				alert(
					`You have selected  a big file size exceeding the maximum limit size ${
						maxsize / 1000000
					}MB`
				);
				nullandvoid(e);
				break;
			}
			if (file + 1 === Files.length) {
				seed.images
					? setFiles({ ...seed, images: Files })
					: setFiles({ ...seed, certifications: Files });
			}
		}
	}
};

export const monitorAFileInput = (e, setFile, seed, maxsize) => {
	const Files = e.target.files;
	const name = e.target.name;
	if (Files[0].size > maxsize) {
		alert(
			`You have selected  a big file size exceeding the maximum limit size ${
				maxsize / 1000000
			}MB `
		);
		e.target.value = null;
		name === 'resume'
			? setFile({ ...seed, resume: [] })
			: setFile({ ...seed, profile: [] });

		return;
	}
	name === 'resume'
		? setFile({ ...seed, resume: Files })
		: setFile({ ...seed, profile: Files });
};

export const AssertAndValidateDesc = (story, dispatch) => {
	if (!story) {
		dispatch({ type: 'APIACCESS_ERROR', error: 'Provide a Brief Description' });
		return false;
	}
	if (!checkStoryValid(story)) {
		dispatch({
			type: 'APIACCESS_ERROR',
			error: 'Invalid Symptoms Description',
		});
		return false;
	}
	return 1;
};

export const AssertAndValidateAddress = (address, dispatch) => {
	if (!checkAddressValid(address)) {
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
		switch ('') {
			case inputs.county:
				dispatch({
					type: 'APIACCESS_ERROR',
					error: 'Select County!',
				});
				return 0;
			case inputs.subCounty:
				dispatch({
					type: 'APIACCESS_ERROR',
					error: 'Select Sub-county!',
				});
				return 0;
			case inputs.ward:
				dispatch({
					type: 'APIACCESS_ERROR',
					error: 'Please provide your Area Ward/location!',
				});
				return 0;
			default:
				break;
		}
		return checkVetFormAddressValid(inputs, dispatch);
	}
};

const checkVetFormUrlValid = (inputs, dispatch) => {
	if (inputs.linkedIn && !checkUrlValid(inputs.linkedIn)) {
		dispatch({
			type: 'APIACCESS_ERROR',
			error: 'Invalid Url!',
		});
		return 0;
	}
	return true;
};

const checkVetFormAddressValid = (inputs, dispatch) => {
	if (!checkAddressValid(inputs.ward)) {
		dispatch({
			type: 'APIACCESS_ERROR',
			error: 'Invalid area Ward / location!',
		});
		return 0;
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
