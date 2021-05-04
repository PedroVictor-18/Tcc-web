/* eslint-disable no-else-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserTypeActions } from './redux/ducks/userTypeReducer';
import parseJwt from './helpers/parseJwt';
import Navigation from './routes/Navigation';
import LoginRoutes from './routes/LoginRoutes';
import { UserFunctions } from './redux/ducks/UserFunctionsReducer';

export default function () {
	const userType = useSelector((state) => state.userType);
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem('@token');
		const jwt = parseJwt(token) ? parseJwt(token) : null;
		if (jwt) {
			dispatch(UserTypeActions.updateActualTypeId(jwt.type_user));
		} else if (token)
			dispatch(UserTypeActions.updateActualTypeId(+jwt.type_user));
	}, []);

	if (userType.actualType !== null)
		return (
			<Navigation userTypeId={userType.actualType || userType.types} />
		);
	else return <LoginRoutes />;
}
