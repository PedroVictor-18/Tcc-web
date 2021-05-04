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
	const [listCompany, setListCompany] = useState([]);

	function OptionsButton({ idCompany }) {
		function viewNavigation() {
			history.push(
				Routes.LOGGED_ROUTES(RouteByPermission[userActualType])
					.COMPANY + `/${idCompany}`
			);
		}
		return (
			<>
				<button
					type="button"
					aria-hidden
					data-toggle="tooltip"
					title="Consultar Empresa"
					className="buttonViewColor"
					onClick={() => viewNavigation(idCompany)}
				>
					<FaEye fill="#ffffff" />
				</button>
			</>
		);
	}
	function changePage() {
		history.push(
			Routes.LOGGED_ROUTES(RouteByPermission[userActualType])
				.CREATE_COMPANY
		);
	}
	useEffect(() => {
		(async function () {
			setIsLoading(true);
			const { data } = await api.get('/list/company');
			if (data.error)
				swal({ icon: 'warning', title: 'Ops!', text: data.message });
			else setListCompany(data.data);
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
									<h5>Lista de Empresas</h5>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-12 col-md-6 col-lg-6">
											<button
												type="button"
												class="btn btn-primary"
												onClick={() => changePage()}
											>
												Cadastrar uma Empresa
											</button>
										</div>
										<div className="col-12 col-md-6 col-lg-6"></div>
									</div>
									<Table
										header={['Nome Empre', 'Endereço', '']}
										body={listCompany.map((company) => {
											return [
												company.name_user,
												` ${company.street} ${company.number}, ${company.district}, ${company.city} - ${company.state} ${company.postcode}`,
												<OptionsButton
													idCompany={company.id_user}
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
