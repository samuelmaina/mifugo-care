import { useAuthDispatch } from '../../../../../context';
import * as Styled from '../../../../../components';
import Axios from 'axios';
import {
	clearContextErrors,
	popLocationFallback,
	ViewErrorMessage,
	createContextErrors,
	remoteuri,
} from '../../../../../utils';

const { ROOT_URL, postJob } = remoteuri;
const path = ROOT_URL + postJob;

export const WaitForRequest = props => {
	const dispatch = useAuthDispatch();

	async function postJob(e) {
		let payload = props.request;

		let formData = new FormData();
		formData.append('description', payload.description);
		formData.append('speciality', payload.speciality);
		formData.append('location', popLocationFallback(payload.location));
		if (payload.images.length === 1) {
			formData.append('images', payload.images[0]);
		} else {
			for (var i = 0; i < payload.images.length; i++) {
				formData.append('images', payload.images[i]);
			}
		}

		const data = {
			headers: {
				'content-type': 'multipart/form-data',
				authorization: JSON.parse(localStorage.getItem('_u')).u,
			},
			body: formData,
		};
		Axios.post(path, data.body, {
			headers: data.headers,
		}).then(
			res => {
				if (res) {
					clearContextErrors(dispatch);
					alert('Success');
					props.nav.history.push('/client/homepage');
				} else return;
			},
			err => {
				alert('Unable to proceed with you Request ..Try again later');
				createContextErrors(
					'Unable to proceed with you Request ..Try again later',
					dispatch
				);
			}
		);
	}

	return (
		<Styled.ContactsDetail>
			<div style={{ height: '55vh' }}>
				<Styled.ProcwtReq onClick={e => postJob(e)}>
					Complete Request
				</Styled.ProcwtReq>
				<ViewErrorMessage />
			</div>
		</Styled.ContactsDetail>
	);
};
