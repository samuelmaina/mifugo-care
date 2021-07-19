import Counties from '../data/counties.json';
import { getselectedspec } from '../vhunits';

export const findChildren = county => {
	for (let i = 0; i < Counties.length; i++) {
		if (Counties[i].name === county) return i;
	}
};

export const popLocationFallback = location => {
	const len = location.length;
	if (len < 2) {
		return location;
	}
	const temp = [];
	temp.push(location[len - 2]);
	temp.push(location[len - 1]);
	return temp;
};

export const appendForreqUpload = data => {
	return {
		linkedIn: data.linkedIn,
		experience: data.experience,
		location: popLocationFallback(data.location),
		speciality: getselectedspec(data.spec),
	};
};
