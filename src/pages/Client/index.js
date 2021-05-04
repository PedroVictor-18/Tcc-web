import React, { useEffect, useState } from 'react';
import SelectsTypeServices from '../../components/Selects/SelectsTypeServices';
import Loading from '../../components/Loading';
import NavBar from '../../components/NavBar';
import api from '../../services/api';
import Calendar from '../../components/Calendar';
import './style.css';
import { useHistory } from 'react-router-dom';
import Routes from '../../routes/data/Routes';
import { useSelector } from 'react-redux';
import parseJwt from '../../helpers/parseJwt';
import RouteByPermission from '../../routes/data/RouteByPermission';
import swal from 'sweetalert';

export default function Index() {
	const history = useHistory();
	const [price, setPrice] = useState();
	const [userIdLogado, setUserIdLogado] = useState(null);
	const [time, setTime] = useState();
	const [service, setService] = useState();
	const [idTypesService, setIdTypesService] = useState();
	const [listServices, setListServices] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState('');

	async function HandleSearch(event) {
		event.preventDefault();
		setIsLoading(true);
		const dataPost = {
			price,
			time,
			service,
			types_services_id_type_service: idTypesService,
		};
		const { data } = await api.post(
			'/services/client/list-services',
			dataPost
		);
		if (data.error === false) setListServices(data.data);
		else setListServices([]);
		setIsLoading(false);
	}

	async function LoadService() {
		const dataPost = {
			price,
			time,
			service,
			types_services_id_type_service: idTypesService,
		};
		const { data } = await api.post(
			'/services/client/list-services',
			dataPost
		);
		if (data.error === false) setListServices(data.data);
		else {
			swal({
				title: 'Ops!',
				text: data.message,
				icon: 'warning',
			});
			setListServices([]);
		}
	}

	async function HandleAceptService(idService) {
		history.push(
			Routes.LOGGED_ROUTES(RouteByPermission[userIdLogado]).ACCEPT +
				`/${idService}`
		);
	}

	useEffect(() => {
		setIsLoading(true);
		LoadService();
		setIsLoading(false);
	}, []);

	useEffect(() => {
		const token = localStorage.getItem('@token');
		const tokenUsuario = parseJwt(token);
		setUserIdLogado(tokenUsuario.sub);
	}, [localStorage.getItem('@token')]);

	return (
		<>
			<NavBar />
			<main>
				<section className="background_page_form">
					<div className="container">
						<div className="row">
							<div className="col-12 col-md-7 col-lg-7">
								<div className="card mt-3">
									<div className="card-body">
										<form onSubmit={HandleSearch}>
											<div className="row">
												<div className="col-12 col-md-4 col-lg-4 ">
													<label htmlFor="priceLabel">
														<b>Valor</b>
													</label>
													<div class="form-group input-group mb-2">
														<div class="input-group-prepend">
															<div class="input-group-text">
																R$
															</div>
														</div>
														<input
															type="text"
															class="form-control"
															id="price"
															placeholder="100,00"
															value={price}
															onChange={(event) =>
																setPrice(
																	event.target.value.replace(
																		',',
																		'.'
																	)
																)
															}
														/>
													</div>
												</div>
												<div className="col-12 col-md-4 col-lg-4 ">
													<label htmlFor="timeLabel">
														<b>Tempo</b>
													</label>
													<div class="form-group input-group mb-2">
														<div class="input-group-prepend">
															<div class="input-group-text">
																Horas
															</div>
														</div>
														<input
															type="text"
															class="form-control"
															id="inlineFormInputGroup"
															placeholder="00:30:00"
															value={time}
															onChange={(event) =>
																setTime(
																	event.target
																		.value
																)
															}
														/>
													</div>
												</div>
												<div className="col-12 col-md-4 col-lg-4">
													<div className="form-group">
														<label htmlFor="servicesLabel">
															<b>
																Tipo de Serviço
															</b>
														</label>
														<SelectsTypeServices
															setIdTypeService={
																setIdTypesService
															}
															valueSelect={
																idTypesService
															}
															required={false}
														/>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-12 col-md-6 col-lg-6">
													<label htmlFor="serviceLabel">
														<b>Serviço</b>
													</label>
													<div class="form-group">
														<div class="input-group mb-2">
															<div class="input-group-prepend">
																<div class="input-group-text">
																	Serviço
																</div>
															</div>
															<input
																type="text"
																class="form-control"
																id="inlineFormInputGroup"
																placeholder="Dentista"
																value={service}
																onChange={(
																	event
																) =>
																	setService(
																		event
																			.target
																			.value
																	)
																}
															/>
														</div>
													</div>
												</div>
											</div>
											<button
												type="submit"
												class="btn btn-primary"
											>
												Buscar
											</button>
										</form>
									</div>
								</div>
								<div className="mt-3">
									{isLoading === true ? (
										<Loading />
									) : (
										<>
											{listServices.map((item) => (
												<div
													className="card-custom"
													key={
														item.id_services_company
													}
												>
													<div className="row">
														<div className="col-12 col-md-4 col-lg-4">
															<div className="card-body-left">
																<div className="tittle-company">
																	<p>
																		Empresa
																	</p>
																</div>
																<div className="mt-3 name-company-service">
																	<p>
																		{
																			item.name_user
																		}
																	</p>
																</div>
																<div className="mt-1 contact-company-service">
																	<p>
																		E-mail:
																		{
																			item.email
																		}
																	</p>
																</div>
																{item.contacts.map(
																	(tel) => (
																		<div className="mt-1 contact-company-service">
																			{`(${tel.ddd_tel}) ${tel.tel_number} | (${tel.ddd_cel})
															${tel.cel_number}`}
																		</div>
																	)
																)}
															</div>
														</div>
														<div className="col-12 col-md-8 col-lg-8">
															<div className="card-body-rigth">
																<div className="mt-1 tittle-service-rigth">
																	<b>
																		Tipo de
																		Serviço:{' '}
																	</b>
																	{
																		item.type_service
																	}
																</div>
																<div>
																	<b>
																		Serviço:{' '}
																	</b>
																	{
																		item.service
																	}
																</div>
																<div>
																	<b>
																		Descrição:
																	</b>
																	{
																		item.description
																	}
																</div>
																<div>
																	<b>
																		Tempo
																		estimado:{' '}
																	</b>
																	{item.time}
																</div>
																<div>
																	<b>
																		Valor:{' '}
																	</b>
																	{item.price}
																</div>
																<button
																	type="button"
																	class="btn btn-primary"
																	onClick={() =>
																		HandleAceptService(
																			item.id_services_company
																		)
																	}
																>
																	Aceitar
																</button>
															</div>
														</div>
													</div>
												</div>
											))}
										</>
									)}
								</div>
							</div>
							<div className="col-12 col-md-5 col-lg-5">
								<div className="card mt-3">
									<Calendar />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
