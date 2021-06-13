import React from 'react';
import * as Styled from '../../../components';
import * as utils from '../../../utils';

export const Userdetails = (props) => {
	const payload = props.payload;
	const controls = props.controls;

	const handlePopupWindow = (e) => {
		const element = e.target.nodeName;

		if (!(element === 'UL' || element === 'LI' || element === 'INPUT')) {
			if (controls.Popup) props.setControllers({ ...controls, Popup: false });
			else props.setControllers({ ...controls, Popup: true });
		}
	};

	const handleSpecPopup = (e) => {
		props.setControllers({ ...controls, spec: !controls.spec });
	};

	return (
		<React.Fragment>
			<Styled.Card>
				<Styled.Input
					type='text'
					name='linkedIn'
					value={payload.linkedIn}
					placeholder='linkedIn URL'
					onChange={(e) => {
						props.setPayload({ ...payload, linkedIn: e.target.value });
					}}
				/>
			</Styled.Card>
			<Styled.Card>
				<Styled.Select
					data-testid='experience'
					name='experience'
					value={payload.experience}
					onChange={(e) =>
						props.setPayload({
							...payload,
							experience: e.target.value,
						})
					}>
					<option value=''>Level of Experience</option>
					<option value='<1'>Less than 1 Year</option>
					<option value='2-3'>2 - 3 Years</option>
					<option value='>3'>More than 3 years</option>
				</Styled.Select>
				<span>*</span>
			</Styled.Card>
			<Styled.P>Field of specialization</Styled.P>
			<Styled.Card>
				<Styled.Speciality onClick={(e) => handlePopupWindow(e)}>
					{controls.counter ? `--Selected-- ${controls.counter}` : `--Select--`}
				</Styled.Speciality>
			</Styled.Card>
			<Styled.P>Specialities</Styled.P>
			<Styled.Card>
				<Styled.Speciality onClick={(e) => handleSpecPopup(e)}>
					---Select from the drop down below ---
				</Styled.Speciality>
				{controls.spec ? (
					<utils.RenderCheckboxes
						data={payload}
						setPayload={props.setPayload}
					/>
				) : null}
			</Styled.Card>
		</React.Fragment>
	);
};
