import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import * as Styled from '../../../../components';
import { VhMarker } from '../../../../images/svg/svg';

export const GoogleMap = (props) => {
	const defaults = {
		center: {
			lat: props.data.location[0],
			lng: props.data.location[1],
		},
		zoom: 11,
	};
	return (
		<Styled.Map>
			<GoogleMapReact
				bootstrapUrlKeys={{ key: 'AIzaSyC-cCEr9hWKJ9GZbCmmD58YBaBntzC_MyU' }}
				defaultCenter={defaults.center}
				defaultZoom={defaults.zoom}>
				<AnyReactComponent
					lat={defaults.center.lat}
					lng={defaults.center.lng}
					text='Client'
				/>
			</GoogleMapReact>
		</Styled.Map>
	);
};

const AnyReactComponent = ({ text }) => {
	const [loctip, setTip] = useState(0);

	return (
		<span
			onMouseEnter={(e) => setTip(true)}
			onMouseLeave={(e) => setTip(false)}>
			{loctip ? (
				<Styled.Loctip>
					<i>{text}</i>
				</Styled.Loctip>
			) : null}
			<VhMarker size={30} />
		</span>
	);
};
