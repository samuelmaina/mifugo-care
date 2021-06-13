import React, { useState } from 'react';
import { useAuthDispatch, useAuthState, logout } from '../../context';
import * as Icons from '../../images/svg/svg';
import * as Styled from '../../components';
import * as utils from '../../utils';

const ViewPortLess1024 = (props) => {
	const dispatch = useAuthDispatch();
	const { userDetails, pass } = useAuthState();
	const view = {
		home: '',
		reset: '',
	};
	view.home = utils.navigate(userDetails);
	view.reset = utils.navigateforReset(userDetails);
	const [links, toggleLinks] = useState(true);

	const handleClicks = (view) => {
		props.setToggle(false);
		utils.clearContextErrors(dispatch);
		utils.clearSuccessMessage(dispatch);
		props.nav.history.push(view);
	};
	return (
		<Styled.ViewPortLess1024>
			<Styled.Less1024SearchBar>
				<input
					type='search'
					placeholder='Search'
					style={{
						width: '100%',
						paddingLeft: '24px',
						height: '40px',
					}}></input>
				<i
					style={{
						cursor: 'pointer',
						position: 'absolute',
						top: '.8rem',
						left: '5px',
					}}>
					<Icons.Search size={14} />
				</i>
			</Styled.Less1024SearchBar>
			<div className='togglenav'>
				<div id='home' onClick={(e) => handleClicks(view.home)}>
					<span className='togglenav-custom-links'>
						<Icons.VhHome size={20} />
					</span>
					<strong>Home</strong>
				</div>
				{userDetails === pass.client ? (
					<React.Fragment>
						<div onClick={(e) => handleClicks(utils.paths.request)}>
							<span className='togglenav-custom-links'>
								<Icons.VhBriefCaseMedical size={18} />
							</span>
							<strong>Request Service</strong>
						</div>
						<div onClick={(e) => handleClicks(utils.paths.ratings)}>
							<span className='togglenav-custom-links'>
								<Icons.VhStar size={18} />
							</span>
							<strong>View Rating</strong>
						</div>
						<div>
							<span className='togglenav-custom-links'>
								<Icons.VhUpdateUser size={20} />
							</span>
							<strong>Update Profile</strong>
						</div>
					</React.Fragment>
				) : null}
				{userDetails === pass.vet ? (
					<div onClick={(e) => handleClicks(utils.paths.vetsubmitDet)}>
						<span className='togglenav-custom-links'>
							<Icons.VhUserCog size={20} fillColor='black' />
						</span>
						<strong>Update Details</strong>
					</div>
				) : null}

				<div id='home' onClick={(e) => handleClicks(view.reset)}>
					<span className='togglenav-custom-links'>
						<Icons.VhKey size={20} />
					</span>
					<strong>Reset password</strong>
				</div>
				<hr />
				<div className='togglenav-links-sp'>
					<strong>Important Links</strong>
					<span onClick={() => toggleLinks(!links)}>
						{links ? (
							<Icons.ArrowDown size={10} rot={'Rot180deg'} />
						) : (
							<Icons.ArrowDown size={10} />
						)}
					</span>
				</div>
				{links ? <Styled.Links /> : null}
			</div>
			<Styled.Logout type='button' onClick={(e) => logout(dispatch)}>
				Logout
			</Styled.Logout>
		</Styled.ViewPortLess1024>
	);
};

export default ViewPortLess1024;
