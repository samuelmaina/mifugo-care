import React, { useState } from 'react';
import { InputField } from '../../components';
import { useAuthDispatch, useAuthState, UploadData } from '../../context';
import { Applogin } from '../../components';
import * as utils from '../../utils';
import '../styling/css/interface.css';

export const Login = (props) => {
	const dispatch = useAuthDispatch();

	const { loading, pass } = useAuthState();

	async function PostLogin(e) {
		e.preventDefault();
		let payload = { email, password };

		let pathname = props.location.pathname.toLocaleLowerCase();
		pathname =
			pathname === '/login' ? '/auth/log-in/client' : '/auth/log-in/vet';

		let validation_info = utils.AssertAndValidateLogin(payload);

		if (validation_info === 'valid') {
			let response = await UploadData(dispatch, payload, pathname);

			if (response.vp_P_A === pass.vet) {
				utils.clearContextErrors(dispatch);
				props.history.push('/vet/homepage');
			} else if (response.vp_P_A === pass.client) {
				utils.clearContextErrors(dispatch);
				props.history.push('/client/homepage');
			} else if (response.vp_P_A === pass.vetUpdate) {
				utils.clearContextErrors(dispatch);
				props.history.push('/vet/completeRegistration');
			}
		} else {
			dispatch({ type: 'APIACCESS_ERROR', error: validation_info });
		}
	}

	const handleurlChange = (e, group) => {
		localStorage.setItem('group', group);
	};

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checked, handleToggle] = useState(false);

	return (
		<React.Fragment>
			<Applogin className='app'>
				<form>
					<div>
						<InputField
							width={'100%'}
							type={'email'}
							name={'email'}
							placeholder={'Email'}
							setField={setEmail}
						/>
						<InputField
							width={'100%'}
							type={'password'}
							name={'password'}
							placeholder={'password'}
							setField={setPassword}
						/>
					</div>
					<section>
						<input
							type='checkBox'
							name='checkbox'
							onChange={(e) => {
								handleToggle(!checked);
							}}
						/>
						<span>Remember me</span>
						<span className='floated_to_right'>
							<a href='\'>Forgot password</a>
						</span>
						<br />
					</section>
					<button
						data-testid='submit-button'
						style={{
							marginTop: '50px',
							borderRadius: '50px',
							width: '90%',
							marginLeft: '4%',
						}}
						onClick={(e) => PostLogin(e)}>
						Login {loading ? '...' : null}
					</button>
					<p>
						No account? Join VetHealth as a{' '}
						<a
							href='/signup'
							onClick={(e) => {
								handleurlChange(e, 'vet');
							}}>
							vet Officer
						</a>{' '}
						or
						<a
							href='/signup'
							onClick={(e) => {
								handleurlChange(e, 'client');
							}}>
							{' '}
							Client
						</a>
					</p>
					<utils.ViewErrorMessage />
				</form>
			</Applogin>
		</React.Fragment>
	);
};
