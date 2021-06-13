import React, { useState } from 'react';
import { useAuthDispatch } from '../../../../../context';
import * as utils from '../../../../../utils';
import * as Styled from '../../../../../components';

export const IdVerificationandContacts = (props) => {
	const dispatch = useAuthDispatch();
	const [resData, setReceived] = useState(false);
	const [telephone, setPhone] = useState('');
	const [code, setCode] = useState(false);
	const [verfCode, setVerfCode] = useState('');

	function goBack() {
		utils.clearContextErrors(dispatch);
		setCode(false);
	}
	function verifyCode() {
		if (!/^[0-9]{6}$/.test(verfCode)) {
			dispatch({
				type: 'APIACCESS_ERROR',
				error: '6 digit code required!',
			});
			return;
		}
		utils.clearContextErrors(dispatch);
		props.setView(3);
	}
	function handleRequestCode() {
		//Reject if formatted telephone Length not equal to Required len

		if (telephone.length !== 11) {
			dispatch({
				type: 'APIACCESS_ERROR',
				error: 'Invalid Phone number for country code 254',
			});
			return;
		}
		//Clear conxext Error
		utils.clearContextErrors(dispatch);
		setCode(true);
	}
	const TrackTelInput = (e) => {
		const formattedPhoneNumber = utils.formatPhoneNumber(e.target.value);
		setPhone(formattedPhoneNumber);
	};
	return (
		<Styled.ContactsDetail>
			<Styled.H1>
				Step 3 of 4 Identity Verification and Contact Information
			</Styled.H1>
			{resData ? (
				<div>
					<Styled.ContDescription>
						Confirm where we can reach you. Continue with the number associated
						with your Google account or choose a different one.
					</Styled.ContDescription>
					<Styled.ContForm>
						<div>
							<span>+254 {resData}</span>
						</div>
						<div>
							<Styled.ProcwtReq type='button'>Continue</Styled.ProcwtReq>
							<Styled.SetNumber
								type='button'
								onClick={(e) => setReceived(false)}>
								Use a different number
							</Styled.SetNumber>
						</div>
					</Styled.ContForm>
				</div>
			) : (
				<div>
					<Styled.ContDescription>
						We’ll send a text message with a 6-digit code to verify and confirm
						your identity. Also our staff may use this information to contact
						you later
						<br /> Standard rates apply.
					</Styled.ContDescription>
					<Styled.ContForm>
						{code ? (
							<div>
								<strong>Enter the 6-digit code</strong>
								<div>
									<span>+254 {telephone}</span>
								</div>
								<div>
									<Styled.RInput
										type='text'
										placeholder='Enter verification code'
										name='code'
										pattern='[0-9]{6}'
										value={verfCode ? verfCode : ''}
										onChange={(e) => setVerfCode(e.target.value)}
									/>
								</div>
								<div>
									<Styled.ProcwtReq
										type='button'
										onClick={(e) => verifyCode(e)}>
										Verify
									</Styled.ProcwtReq>
									<Styled.SetNumber type='button' onClick={(e) => goBack(e)}>
										Go-back
									</Styled.SetNumber>
								</div>
							</div>
						) : (
							<div>
								<div>
									<Styled.TelInput
										type='tel'
										placeholder='Phone number'
										name='phone'
										value={telephone}
										onChange={(e) => TrackTelInput(e)}
									/>
								</div>
								<Styled.Code254>+254</Styled.Code254>
								<div>
									<Styled.SendCode
										type='button'
										onClick={(e) => handleRequestCode()}>
										Send Code
									</Styled.SendCode>
								</div>
							</div>
						)}
					</Styled.ContForm>
				</div>
			)}
			<utils.ViewErrorMessage />
		</Styled.ContactsDetail>
	);
};
