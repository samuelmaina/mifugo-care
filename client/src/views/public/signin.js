import React, { useState } from 'react';
import { InputField } from '../../components';
import {
	useAuthDispatch,
	loginUser,
	useAuthState,
	routePass,
} from '../../context';
import { AssertAndValidateLogin } from '../../utils/validate';
import '../styling/css/interface.css';

export const Login = (props) => {
	const dispatch = useAuthDispatch();

	const { loading, errorMessage } = useAuthState();

	async function PostLogin(e) {
		e.preventDefault();
		let payload = { email, password };

		let validation_info = AssertAndValidateLogin(payload);

		if (validation_info === 'valid') {
			let response = await loginUser(dispatch, payload);
			if (response.vp_P_A === routePass.vet) {
				props.history.push('/vet/homepage');
			} else if (response.vp_P_A === routePass.client) {
				props.history.push('/client/homepage');
			} else if (response.vp_P_A === routePass.vetUpdate) {
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
		<div className='app' style={{ left: '35%', width: '30%', top: '20vh' }}>
			<form>
				<div>
					<InputField
						type={'email'}
						name={'email'}
						placeholder={'Email'}
						setField={setEmail}
					/>
					<InputField
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
					style={{ color: 'black' }}
					onClick={(e) => PostLogin(e)}>
					Login {loading ? '...' : null}
				</button>
				<p>
					No account? Join Vet Health as a{' '}
					<a
						href='signup'
						onClick={(e) => {
							handleurlChange(e, 'group2');
						}}>
						vet Officer
					</a>{' '}
					or
					<a
						href='signup'
						onClick={(e) => {
							handleurlChange(e, 'group4');
						}}>
						{' '}
						Client
					</a>
				</p>
				{errorMessage ? (
					<p className='errorField' role='alert'>
						{errorMessage}
					</p>
				) : null}
			</form>
		</div>
	);
};
