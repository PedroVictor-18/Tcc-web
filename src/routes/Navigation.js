import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RouteByPermission from './data/RouteByPermission';
import Routes from './data/Routes';
import Page404 from '../pages/404';
import AdministratorRoute from './AdministratorRoute';
import ClientRoute from './ClientRoute';
import CompanyRoute from './CompanyRoute';

export default function Navigation({ userTypeId }) {
	function buildRoutes(path, render) {
		return (
			<Switch>
				<Route
					exact
					path={Routes.LOGGED_ROUTES().INDEX}
					render={() => (
						<Redirect
							to={
								Routes.LOGGED_ROUTES(
									RouteByPermission[userTypeId]
								).HOME
							}
						/>
					)}
				/>
				<Route path={path} render={render} />
				<Route path="*" component={Page404} />
			</Switch>
		);
	}

	const routes = [
		null,
		buildRoutes(RouteByPermission[1], AdministratorRoute),
		buildRoutes(RouteByPermission[2], CompanyRoute),
		buildRoutes(RouteByPermission[3], ClientRoute),
	];

	return routes[userTypeId];
}
