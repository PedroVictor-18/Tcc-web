import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Loading from '../../../components/Loading';
import NavBar from '../../../components/NavBar';
import Table from '../../../components/Table';
import RouteByPermission from '../../../routes/data/RouteByPermission';
import Routes from '../../../routes/data/Routes';
import api from '../../../services/api';

export default function Index() {
	const history = useHistory();
	const userActualType = useSelector((state) => state.userType.actualType);
	const [isLoading, setIsLoading] = useState(true);
	const [listClient, setListClient] = useState([]);

	function OptionsButton({ idCliente }) {
		function viewNavigation() {
			history.push(
				Routes.LOGGED_ROUTES(RouteByPermission[userActualType])
					.CLIENT + `/${idCliente}`
			);
		}
		return (
			<>
				<button
					type="button"
					aria-hidden
					data-toggle="tooltip"
					title="Consultar Cliente"
					className="buttonViewColor"
					onClick={() => viewNavigation(idCliente)}
				>
					<FaEye fill="#ffffff" />
				</button>
			</>
		);
	}
	function changePage() {
		history.push(
			Routes.LOGGED_ROUTES(RouteByPermission[userActualType])
				.CREATE_CLIENT
		);
	}
	useEffect(() => {
		(async function () {
			setIsLoading(true);
			const { data } = await api.get('/list/client');
			if (data.error)
				swal({ icon: 'warning', title: 'Ops!', text: data.message });
			else setListClient(data.data);
			setIsLoading(false);
		})();
	}, []);
	return (
		<>
			<NavBar />
			<section className="background_page_form">
				<div className="container">
					<div className="row mt-3">
						{isLoading === true ? (
							<Loading />
						) : (
							<div className="card">
								<div className="card-header">
									<h5>Lista de Clientes</h5>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-12 col-md-6 col-lg-6">
											<button
												type="button"
												class="btn btn-primary"
												onClick={() => changePage()}
											>
												Cadastrar um Cliente
											</button>
										</div>
										<div className="col-12 col-md-6 col-lg-6"></div>
									</div>
									<Table
										header={['Nome Empre', 'Endereço', '']}
										body={listClient.map((client) => {
											return [
												client.name_user,
												` ${client.street} ${client.number}, ${client.district}, ${client.city} - ${client.state} ${client.postcode}`,
												<OptionsButton
													idCliente={client.id_user}
												/>,
											];
										})}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
}
