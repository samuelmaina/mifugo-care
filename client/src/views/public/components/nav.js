import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

class NavBar extends Component {
	render() {
		const { isAuth } = this.props.auth;
		const guestRoutes = (
			<div>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/signup">SignUp</Link>
				</li>
				<li>
					<Link to="/vet">Vet</Link>
				</li>
			</div>
		);
		const authenticatedRoutes = (
			<div>
				<ul>
					<li className="current">
						<Link to="/profiles">Developers</Link>
					</li>
					<li>
						<a href="one" onClick={this.onLogoutClick}>
							Logout
						</a>
					</li>
				</ul>
			</div>
		);
		return (
			<header>
				<div className="container">
					<div id="branding">
						<Link to="/">
							<span className="highlight">Dev</span>Connector
						</Link>
					</div>
					<nav>{isAuth ? authenticatedRoutes : guestRoutes}</nav>
				</div>
			</header>
		);
	}
}
NavBar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	clearCurrentProfile: PropTypes.func.isRequired,
};
