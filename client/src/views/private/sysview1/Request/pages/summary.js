import * as utils from '../../../../../utils';

export const RequestSummary = (props) => {
	const controllers = {
		source: 'client',
		text: 'Step 2 of 4 Request summary',
	};
	return (
		<utils.TryThis
			data={props.data}
			setPayload={props.setPayload}
			controls={controllers}
			setView={props.setView}
		/>
	);
};
