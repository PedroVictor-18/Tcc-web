import React from 'react';
import PrivateRouter from './PrivateRouter';
import Administrator from '../pages/Administrator';
import Companies from '../pages/Administrator/Companies';
import CreateCompanies from '../pages/Administrator/Companies/Create';
import ProfileCompanies from '../pages/Administrator/Companies/Profile';
import ListClient from '../pages/Administrator/Client';
import ProfileClient from '../pages/Administrator/Client/Profile';
import CreateClient from '../pages/Administrator/Client/Create';
import Routes from './data/Routes';

export default function AdministratorRoute({ match: { url } }) {
	const LOGGED_ROUTES = Routes.LOGGED_ROUTES(url);

	return (
		<>
			<PrivateRouter
				userTypes={1}
				path={LOGGED_ROUTES.HOME}
				exact
				component={Administrator}
			/>
			<PrivateRouter
				userTypes={1}
				path={LOGGED_ROUTES.LIST_COMPANY}
				exact
				component={Companies}
			/>
			<PrivateRouter
				userTypes={1}
				path={LOGGED_ROUTES.CREATE_COMPANY}
				exact
				component={CreateCompanies}
			/>
			<PrivateRouter
				userTypes={1}
				path={LOGGED_ROUTES.PROFILE_COMPANY}
				exact
				component={ProfileCompanies}
			/>
			<PrivateRouter
				userTypes={1}
				path={LOGGED_ROUTES.LIST_CLIENT}
				exact
				component={ListClient}
			/>
			<PrivateRouter
				userTypes={1}
				path={LOGGED_ROUTES.PROFILE_CLIENT}
				exact
				component={ProfileClient}
			/>
			<PrivateRouter
				userTypes={1}
				path={LOGGED_ROUTES.CREATE_CLIENT}
				exact
				component={CreateClient}
			/>
		</>
	);
}
