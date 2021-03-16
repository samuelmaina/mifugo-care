import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from './context';
import { AppRouter } from './components';
import { routes, Login } from './config/routes';

export const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div>
					<Route exact path='/' component={Login} />
					{routes.map((route) => (
						<AppRouter
							key={route.path}
							path={route.path}
							component={route.component}
							isPrivate={route.isPrivate}
							pass={route.pass}
						/>
					))}
				</div>
			</Router>
		</AuthProvider>
	);
};
