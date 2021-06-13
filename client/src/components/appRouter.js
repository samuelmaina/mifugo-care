import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from '../context';

export const AppRouter = ({
	component: Component,
	path,
	isPrivate,
	pass,
	...rest
}) => {
	const { userDetails } = useAuthState();
	/**
	 * By doing this , we are making sure each group is Routed to their specific routes
	 * i.e,A vet in session cannot access clients view
	 *
	 * but'll be Redirected to Login
	 */
	return (
		<Route
			path={path}
			render={(props) =>
				isPrivate && !Boolean(userDetails === pass) ? (
					<Redirect to={{ pathname: '/login' }} />
				) : (
					<Component {...props} />
				)
			}
			{...rest}
		/>
	);
};
