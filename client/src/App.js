import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { AuthProvider } from './context';
import { AppRouter } from './components';
import { routes } from './config/routes';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
    }
`;
export const App = () => {
	return (
		<AuthProvider>
			<GlobalStyle />
			<Router>
				<Switch>
					<Route exact path='/' render={(props) => <Redirect to='/login' />} />
					{routes.map((route) => (
						<AppRouter
							key={route.path}
							path={route.path}
							component={route.component}
							isPrivate={route.isPrivate}
							pass={route.pass}
						/>
					))}
				</Switch>
			</Router>
		</AuthProvider>
	);
};
