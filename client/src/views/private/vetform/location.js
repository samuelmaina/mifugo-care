import React from 'react';
import { TryThis } from '../../../utils';

export const UserLocation = (props) => {
	const controllers = {
		source: 'vet',
		text: 'Your Location',
	};

	return (
		<TryThis
			data={props.payload}
			setPayload={props.setPayload}
			controls={controllers}
		/>
	);
};
