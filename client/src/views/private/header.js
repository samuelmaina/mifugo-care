import React, { useState } from 'react';
import { useAuthDispatch, logout } from '../../context';
import * as Styled from '../../components';
import * as Icons from '../../images/svg/svg';

const Header = (props) => {
	const HandleToggle = (e) => {
		props.setToggle(!props.toggleState);

		if (props.width > 1024) {
			props.setDashBoard(!props.dash);
		}
	};

	const [popup_prof, setPopup] = useState(false);

	return (
		<Styled.Wrapper>
			<Styled.C_H>
				<Styled.C_C>
					<Styled.H_W>VetHealth</Styled.H_W>
					<Styled.H_C>
						<Styled.N_L className='N_L-links'>
							<Styled.Links />
						</Styled.N_L>
						<Styled.N_R>
							<Styled.LeftInnerAddon className='left-inner-addon'>
								<input type='search' placeholder='search'></input>
								<i>
									<Icons.Search size={14} />
								</i>
							</Styled.LeftInnerAddon>
							<Styled.UserIcon
								active={popup_prof}
								className='user-icon'
								onClick={() => setPopup(!popup_prof)}>
								<strong>Profile</strong>
								<i>
									<Icons.User size={20} />
								</i>
							</Styled.UserIcon>
							{popup_prof ? <ProfilePopUp /> : null}
						</Styled.N_R>
					</Styled.H_C>
				</Styled.C_C>
			</Styled.C_H>
			<Styled.Subnav className='sub-nav'>
				<div>
					<Styled.ToggleSpan
						onClick={(e) => {
							HandleToggle(e);
						}}>
						{props.toggleState && props.width < 1024 ? (
							<Icons.Cross size={30} />
						) : (
							<Icons.Bars size={30} />
						)}
					</Styled.ToggleSpan>
				</div>
			</Styled.Subnav>
			{props.width < 1024 && !props.toggleState ? <Styled.Rule /> : null}
		</Styled.Wrapper>
	);
};

const ProfilePopUp = () => {
	const dispatch = useAuthDispatch();
	return (
		<Styled.ModalProfPopup>
			<ul style={{ padding: '0', margin: '0' }}>
				<Styled.PrfPopupLi> Profile</Styled.PrfPopupLi>
				<Styled.PrfPopupLi onClick={() => logout(dispatch)}>
					<Icons.VhSignOut size={14} /> Logout
				</Styled.PrfPopupLi>
			</ul>
		</Styled.ModalProfPopup>
	);
};
export default Header;
