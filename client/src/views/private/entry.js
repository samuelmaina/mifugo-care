import React, { useState, useEffect } from 'react';
import ViewPortLess1024 from './viewportless1024';
import Header from './header';
import * as utils from '../../utils';
import * as Styled from '../../components';
import '../styling/css/client.css';

export const Entry = (props) => {
	let Rendered;
	const { width } = UseWindowDimensions();
	const [dash, setDashBoard] = useState(width > 1024);
	const [toggleState, setToggle] = useState(false);

	if (toggleState && width < 1024)
		Rendered = <ViewPortLess1024 nav={props.nav} setToggle={setToggle} />;
	else
		Rendered = (
			<Styled.ClientRootContainer>
				{dash ? <utils.LeftNavigator nav={props.nav} /> : null}
				<props.Component nav={props.nav} />
			</Styled.ClientRootContainer>
		);

	return (
		<Styled.ClientRoot>
			<Header
				setDashBoard={setDashBoard}
				dash={dash}
				width={width}
				toggleState={toggleState}
				setToggle={setToggle}
			/>
			{Rendered}
		</Styled.ClientRoot>
	);
};

const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;

	return { width, height };
};

const UseWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);
	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return windowDimensions;
};
