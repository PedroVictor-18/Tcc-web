import React, { useEffect, useState } from 'react';
import NavBar from '../../../components/NavBar';
import api from '../../../services/api';
import Calendar from '../../../components/Calendar';
import Loading from '../../../components/Loading';
import { useHistory, useParams } from 'react-router-dom';
import '../style.css';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Routes from '../../../routes/data/Routes';
import RouteByPermission from '../../../routes/data/RouteByPermission';
import parseJwt from '../../../helpers/parseJwt';
import DatePicker from 'react-datepicker';
import swal from 'sweetalert';

export default function Index() {
	const { idService } = useParams();
	const history = useHistory();
	const [userIdLogado, setUserIdLogado] = useState(null);
	const [date, setDate] = useState(moment().format('DD/MM/YYYY'));
	const [hour, setHour] = useState('');
	const [note, setNote] = useState('');
	const [service, setService] = useState();
	const [isLoading, setIsLoading] = useState(true);

	async function loadService() {
		setIsLoading(true);
		const { data } = await api.get('/services/view-services', {
			params: {
				idService: idService,
			},
		});
		if (data.error === false) setService(data.data);
		else setService([]);
		setIsLoading(false);
		setIsLoading(false);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		const dataPost = {
			day: date,
			hour: hour,
			note: note,
			idServicesCompany: idService,
		};
		const { data } = await api.post('/calendar/create', dataPost);
		if (data.error === true)
			swal({ icon: 'warning', title: 'Ops!', text: data.message });
		else {
			swal({ icon: 'success', text: data.message, title: 'Sucesso!' });
			history.push(
				Routes.LOGGED_ROUTES(RouteByPermission[userIdLogado]).CALENDAR
			);
		}
	}

	function handleCancel() {
		history.push(
			Routes.LOGGED_ROUTES(RouteByPermission[userIdLogado]).HOME
		);
	}

	useEffect(() => {
		const token = localStorage.getItem('@token');
		const tokenUsuario = parseJwt(token);
		setUserIdLogado(tokenUsuario.sub);
	}, [localStorage.getItem('@token')]);

	useEffect(() => {
		loadService();
	}, [idService]);
	return (
		<>
			<NavBar />
			<main>
				<section className="background_page_form">
					<div className="container">
						{isLoading === true ? (
							<Loading />
						) : (
							<div className="card mt-3">
								<div className="card-header">
									<div className="row">
										<div className="col-12 col-md-6 col-lg-6">
											<p>
												<b>Tipo de Serviço: </b>
												{service.type_service}
											</p>
										</div>
										<div className="col-12 col-md-6 col-lg-6">
											<p>
												<b>Serviço: </b>
												{service.service}
											</p>
										</div>
									</div>
									<div className="row">
										<div className="col-12 col-md-6 col-lg-6">
											<p>
												<b>Tempo estimado: </b>
												{service.time}
											</p>
										</div>
										<div className="col-12 col-md-6 col-lg-6">
											<p>
												<b>Valor: </b>
												{service.price}
											</p>
										</div>
									</div>
									<p>
										<b>Descrição: </b>
										{service.description}
									</p>
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<div className="row">
												<div className="col-12 col-md-6 col-lg-6">
													<div className="form-group row">
														<label
															htmlFor="example-date-input"
															className="col-2 col-form-label"
														>
															<b>Dia: </b>
														</label>
														<div className="col-10">
															<input
																required
																className="form-control"
																type="text"
																value={date}
																id="example-date-input"
																onChange={(
																	event
																) =>
																	setDate(
																		event
																			.target
																			.value
																	)
																}
															/>
														</div>
													</div>
												</div>
												<div className="col-12 col-md-6 col-lg-6">
													<div className="form-group row">
														<label
															htmlFor="example-date-input"
															className="col-2 col-form-label"
														>
															<b>Hora: </b>
														</label>
														<div className="col-10">
															<input
																required
																className="form-control"
																placeholder="13:30:00"
																type="text"
																value={hour}
																id="example-time-input"
																onChange={(
																	event
																) =>
																	setHour(
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
											<label
												htmlFor="example-date-input"
												className="col-form-label"
											>
												<b>Nota: </b>
											</label>
											<input
												required
												className="form-control"
												placeholder="Nota"
												type="text"
												value={note}
												id="example-time-input"
												onChange={(event) =>
													setNote(event.target.value)
												}
											/>
										</div>
										<div className="row">
											<div className="col-12 col-md-6 col-lg-6">
												<button
													type="submit"
													class="btn btn-primary"
												>
													Marcar compromisso
												</button>
											</div>
											<div className="col-12 col-md-6 col-lg-6">
												<button
													type="button"
													class="btn btn-danger"
													onClick={handleCancel}
												>
													Cancelar
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
