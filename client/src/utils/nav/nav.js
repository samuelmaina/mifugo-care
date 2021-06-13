import React, { useState, useEffect } from 'react';
import { paths } from '..';
import * as Icons from '../../images/svg/svg';
import * as Styled from '../../components';
import { useAuthState, useAuthDispatch } from '../../context';
import * as utils from '../../utils';

const handleNavigation = (nav, dispatch, view) => {
	//  client main navigation

	switch (view) {
		case 'request':
			dispatch({ type: 'NAVIGATION', view: 'request' });
			nav.history.push(paths.request);
			break;
		case 'home':
			dispatch({ type: 'NAVIGATION', view: 'home' });
			nav.history.push(paths.clientHome);
			break;
		case 'ratings':
			dispatch({ type: 'NAVIGATION', view: 'ratings' });
			nav.history.push(paths.ratings);
			break;
		default:
			nav.history.push(paths.clientHome);
	}
};

const LeftNavigator = (props) => {
	/**
	 * System left bar menu
	 * cross platform i.e both client and vet
	 */
	const dispatch = useAuthDispatch();
	const handleClicks = (view) => {
		utils.clearContextErrors(dispatch);
		utils.clearSuccessMessage(dispatch);
		props.nav.history.push(view);
	};
	const pathname = props.nav.location.pathname;
	const { userDetails, pass } = useAuthState();
	const relativeView = {
		text: '',
		icon: '',
		path: '',
		home: '',
		reset: '',
		update: '',
	};
	const setRelativeView = (text, icon, path) => {
		relativeView.text = text;
		relativeView.icon = icon;
		relativeView.path = path;
	};
	if (pathname === paths.request) {
		setRelativeView(
			'View Rating',
			<Icons.VhStar size={18} fillColor={'white'} />,
			paths.ratings
		);
	} else if (pathname === paths.ratings) {
		setRelativeView(
			'Request Service',
			<Icons.VhBriefCaseMedical size={18} fillColor={'white'} />,
			paths.request
		);
	}
	relativeView.home = navigate(userDetails);
	relativeView.reset = navigateforReset(userDetails);
	return (
		<Styled.Navleft className='navLeft'>
			<Styled.NavLeftElms onClick={(e) => handleClicks(relativeView.home)}>
				<span>
					<Icons.VhIgloo size={18} />
				</span>
				<strong>Dashboard</strong>
			</Styled.NavLeftElms>
			{relativeView.text ? (
				<Styled.NavLeftElms onClick={(e) => handleClicks(relativeView.path)}>
					<span>{relativeView.icon}</span>
					<strong>{relativeView.text}</strong>
				</Styled.NavLeftElms>
			) : null}
			{userDetails === pass.vet ? (
				<Styled.NavLeftElms onClick={(e) => handleClicks(paths.vetsubmitDet)}>
					<span>
						<Icons.VhUserCog size={20} fillColor='white' />
					</span>
					<strong>Update details</strong>
				</Styled.NavLeftElms>
			) : null}

			<Styled.NavLeftElms>
				<span>
					<Icons.VhBookMedical size={18} />
				</span>
				<strong>Quick Survey</strong>
			</Styled.NavLeftElms>
			<Styled.NavLeftElms onClick={(e) => handleClicks(relativeView.reset)}>
				<span>
					<Icons.VhKey size={20} fillColor='white' />
				</span>
				<strong>Reset Password</strong>
			</Styled.NavLeftElms>
			<hr />
			<strong>Communicate</strong>
			<Styled.NavLeftElms>
				<span>
					<Icons.VhComments size={18} />
				</span>
				<strong>Chat</strong>
			</Styled.NavLeftElms>
		</Styled.Navleft>
	);
};

const Slider = ({ task, ...rest }) => {
	/**
	 * performs Images Slideshow
	 *Cross platform
	 */
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => setIndex(index + 1), 9000);
		return () => {
			clearInterval(interval);
		};
	}, [index]);

	if (index > rest.num - 1) {
		setIndex(0);
	}
	task = task === undefined ? rest.job_id : task;
	return <rest.component index={index} nav={rest.nav} task={task} />;
};
const getChar = (user) => {
	return user.charAt(0);
};

const navigate = (user) => {
	switch (getChar(user)) {
		case 'v':
			return paths.vetHome;
		case 'c':
			return paths.clientHome;
		default:
			break;
	}
};

const navigateforReset = (user) => {
	switch (getChar(user)) {
		case 'v':
			return paths.vetReset;
		case 'c':
			return paths.clientReset;
		default:
			break;
	}
};
export { handleNavigation, LeftNavigator, Slider, navigate, navigateforReset };
