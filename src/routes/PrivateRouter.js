import React from 'react';
import { Route } from 'react-router-dom';
import parseJwt from '../helpers/parseJwt';

const PrivateRouter = ({ userTypes, component: Component, ...rest }) => {
	const token = localStorage.getItem('@token');
	const tokenUsuario = parseJwt(token);
	const isAuthenticated = tokenUsuario !== null;

	return (
		isAuthenticated && (
			<Route {...rest} render={(props) => <Component {...props} />} />
		)
	);
};
export default PrivateRouter;
