import React, { useState } from 'react';
import { useAuthDispatch, useAuthState } from '../../../../context';
import { Slider } from '../../../../utils';
import {
	WaitForRequest,
	IdVerificationandContacts,
	RequestSummary,
	RequestHomeView,
} from './pages';
import * as Styled from '../../../../components';

export const RequestService = (props) => {
	return <Slider component={RequestServiceSlideView} nav={props.nav} num={3} />;
};
const RequestServiceSlideView = (props) => {
	const data = {
		location: [],
		speciality: '',
		description: '',
		images: [],
	};

	const dispatch = useAuthDispatch();
	const { clientInitCoords } = useAuthState();

	const [coords, setCoords] = useState(false);
	const [view, setView] = useState(0);

	const [payload, setPayload] = useState(data);

	let renderedInThisView;

	function getCoords() {
		if (!(coords || clientInitCoords === 'init')) {
			if (navigator.geolocation) {
				var timeoutVal = 10 * 1000 * 1000;
				navigator.geolocation.getCurrentPosition(
					displayPosition,
					displayError,
					{
						enableHighAccuracy: true,
						timeout: timeoutVal,
						maximumAge: 0,
					}
				);
				setCoords(true);
			} else {
				console.log('geolocation not supported');
			}
		}
	}

	function displayError(error) {
		var errors = [
			'Permission denied',
			'Position unavailable',
			'Request timeout',
		];
		dispatch({ type: '3RDPARTYAPIACCESS_ERROR', error: errors[error.code] });
	}

	function displayPosition(position) {
		const temp = payload.location;
		temp.push(position.coords.latitude);
		temp.push(position.coords.longitude);
		setPayload({ ...payload, location: temp });
		dispatch({ type: 'GEOLOCATION', init: 'init' });
	}
	switch (view) {
		case 0:
			renderedInThisView = (
				<RequestHomeView
					data={payload}
					setPayload={setPayload}
					setView={setView}
				/>
			);
			getCoords();
			break;
		case 1:
			renderedInThisView = (
				<RequestSummary
					data={payload}
					setView={setView}
					setPayload={setPayload}
				/>
			);
			break;
		case 2:
			renderedInThisView = <IdVerificationandContacts setView={setView} />;
			break;
		case 3:
			renderedInThisView = <WaitForRequest request={payload} nav={props.nav} />;
			break;
		default:
			break;
	}

	return (
		<Styled.ClientRequestView index={props.index}>
			<Styled.ClientRequestForm>{renderedInThisView}</Styled.ClientRequestForm>
		</Styled.ClientRequestView>
	);
};
