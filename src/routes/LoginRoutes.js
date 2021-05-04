import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import ForgotPassword from '../pages/Login/ForgotPassword';
import Register from '../pages/Login/Register';
import Routes from './data/Routes';
import Page404 from '../pages/404';

export default function LoginRoutes() {
	return (
		<>
			<Switch>
				<Route exact path={Routes.LOGIN} component={Login} />
				<Route
					exact
					path={Routes.FORGOT_PASSWORD}
					component={ForgotPassword}
				/>
				<Route exact path={Routes.CREATE_USER} component={Register} />
				<Route path="*" component={Page404} />
			</Switch>
		</>
	);
}
