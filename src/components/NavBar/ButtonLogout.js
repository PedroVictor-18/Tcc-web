import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserTypeActions } from '../../redux/ducks/userTypeReducer';
import api from '../../services/api';
import Routes from '../../routes/data/Routes';

export default function Menu() {
	const history = useHistory();
	const dispatch = useDispatch();

	function logoutUser(event) {
		event.preventDefault();
		(async function () {
			await api.get('/logout');
			dispatch(UserTypeActions.updateActualTypeId(null));
			dispatch(UserTypeActions.updateUserTypeIds([]));
			history.push(Routes.LOGIN);
			localStorage.clear();
		})();
	}

	return (
		<li className="nav-text">
			<Link
				onClick={logoutUser}
				className="nav-link sidebar-link text-light p-2"
			>
				<span className="mr-3 sidebar-icons">
					<FaSignOutAlt />
				</span>
				Sair
			</Link>
		</li>
	);
}
