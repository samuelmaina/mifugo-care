import React, { useState } from 'react';
import { useAuthDispatch } from '../../../context';
import * as Styled from '../../../components';
import * as utils from '../../../utils';
export const ResetView = (props) => {
	const dispatch = useAuthDispatch();
	const [view, setview] = useState(0);
	const [codes, setCodes] = useState({ current: '', new: '', confirm: '' });

	const handleClick = (e) => {
		utils.clearContextErrors(dispatch);
		if (!view) {
			if (utils.AssertAndValidatePasscode(codes.current, dispatch)) {
				setview(1);
			}
		} else if (
			codes.new === codes.confirm &&
			utils.AssertAndValidatePasscode(codes.new, dispatch)
		) {
			console.log('success');
		} else
			dispatch({ type: 'APIACCESS_ERROR', error: 'Password Match Error!' });
	};

	let render = <View1 />;
	switch (view) {
		case 0:
			render = <View1 set={setCodes} codes={codes} />;
			break;
		case 1:
			render = <View2 set={setCodes} codes={codes} />;
			break;
		default:
			break;
	}
	return (
		<Styled.VetView>
			<Styled.PairStruct>
				<Styled.Passreset>
					{render}
					<Styled.Card>
						<Styled.ProcwtReq type='button' onClick={(e) => handleClick(e)}>
							Confirm
						</Styled.ProcwtReq>
						<utils.ViewErrorMessage />
					</Styled.Card>
				</Styled.Passreset>
			</Styled.PairStruct>
		</Styled.VetView>
	);
};

const View1 = (props) => {
	return (
		<Password text='Enter Your current password' src='current' state={props} />
	);
};

const View2 = (props) => {
	return (
		<React.Fragment>
			<Password text='Enter new password' src='new' state={props} />
			<Password text='Confirm new password' src='confirm' state={props} />
		</React.Fragment>
	);
};

const Password = ({ text, ...rest }) => {
	const codes = rest.state.codes;

	function handleChange(src) {
		if (src.name === 'current')
			rest.state.set({ ...codes, current: src.value });
		else if (src.name === 'new') rest.state.set({ ...codes, new: src.value });
		else rest.state.set({ ...codes, confirm: src.value });
	}

	return (
		<React.Fragment>
			<Styled.Card>
				<Styled.PostedBy>{text}</Styled.PostedBy>
			</Styled.Card>
			<Styled.Card>
				<Styled.Pass
					type='password'
					name={rest.src}
					placeholder='password'
					onPaste={(e) => e.preventDefault()}
					onChange={(e) => handleChange(e.target)}
				/>
			</Styled.Card>
		</React.Fragment>
	);
};
