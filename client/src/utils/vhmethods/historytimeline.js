import { remoteuri } from '../paths';
import { fetchData } from '../../context';

export const getSplitDate = (data, type) => {
	const [date, time] = new Date(data).toLocaleString().split(',');
	if (type === 'date') return date;
	return time;
};

export async function doRequestAlljobs(dispatch) {
	let response = await fetchData(dispatch, remoteuri.allforClient);
	if (response) {
		console.log(response);
		return response;
	}
	return false;
}

export const sanitizedJobs = (jobs, status) => {
	const sanitized = [];
	if (status === 'allocated') {
		for (let i = 0; i < jobs.length; i++) {
			if (jobs[i].status === status || jobs[i].status === 'pending')
				sanitized.push(jobs[i]);
		}
		return sanitized;
	} else {
		for (let i = 0; i < jobs.length; i++) {
			if (jobs[i].status === status) sanitized.push(jobs[i]);
		}
		return sanitized;
	}
};

export const timeLinevalue = async (dispatch) => {
	const data = await doRequestAlljobs(dispatch);
	if (data) return sanitizedJobs(data.jobs, 'allocated').length;
	return 0;
};
