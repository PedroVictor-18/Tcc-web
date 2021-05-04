import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SelectsTypeServices from '../../../components/Selects/SelectsTypeServices';
import Table from '../../../components/Table';
import Routes from '../../../routes/data/Routes';
import RouteByPermission from '../../../routes/data/RouteByPermission';
import api from '../../../services/api';
import { useSelector } from 'react-redux';

export default function FormServices() {
	const [ListServices, setListServices] = useState([]);
	const [Price, setPrice] = useState('');
	const [Time, setTime] = useState('');
	const [Service, setService] = useState('');
	const history = useHistory();
	const userActualType = useSelector((state) => state.userType.actualType);
	const [IdTypeService, setIdTypeService] = useState(null);

	async function loadServices() {
		const datapost = {
			price: Price,
			time: Time,
			service: Service,
			types_services_id_type_service: IdTypeService,
		};
		const { data } = await api.post(
			'/services/company/list-services',
			datapost
		);
		if (data.error === true) {
			console.log('Erro');
		} else {
			setListServices(data.data);
		}
	}
	function changePage() {
		history.push(
			Routes.LOGGED_ROUTES(
			RouteByPermission[userActualType]
		).CREATE_SERVICES);
	}

	useEffect(() => {
		loadServices();
	}, []);
	return (
		<section id="form-services">
			<div className="container">
				<div className="card mt-3">
					<div className="card-body">
						<form onSubmit={loadServices}>
							<div className="row">
								<div className="col-12 col-md-3 col-lg-3">
									<div className="form-group">
										<label htmlFor="exampleFormControlInput1">
											Preço
										</label>
										<input
											type="text"
											className="form-control"
											id="exampleFormControlInput1"
											placeholder="R$150,00"
											onChange={(event) =>
												setPrice(event.target.value)
											}
										/>
									</div>
								</div>
								<div className="col-12 col-md-3 col-lg-3">
									<div className="form-group">
										<label htmlFor="exampleFormControlInput1">
											Tempo
										</label>
										<input
											type="text"
											className="form-control"
											id="idTime"
											placeholder="08:30:00"
											onChange={(event) =>
												setTime(event.target.value)
											}
										/>
									</div>
								</div>
								<div className="col-12 col-md-3 col-lg-3">
									<div className="form-group">
										<label htmlFor="exampleFormControlInput1">
											Serviço
										</label>
										<input
											type="text"
											className="form-control"
											id="service"
											placeholder="Cortar Cabelo"
											onChange={(event) =>
												setService(event.target.value)
											}
										/>
									</div>
								</div>
								<div className="col-12 col-md-3 col-lg-3">
									<label>Selecione o tipo de Serviço</label>
									<SelectsTypeServices
										setIdTypeService={setIdTypeService}
										valueSelect={IdTypeService}
										disabled={false}
									/>
								</div>
							</div>
							<div className="d-flex justify-content-between">
							<button type="submit" class="btn btn-primary mt-3">
								Buscar
							</button>
							<button type="button" class="btn btn-primary mt-3"
							onClick={()=>changePage()}
							>

								Criar Serviço
							</button>
							</div>
						</form>
						<hr />
						<Table
							header={['#','Clientes', 'Serviços','Horário', 'Valor']}
							body={ListServices.map((service) => {
								return [
									service.id_services_company,service.service,service.description,service.time,service.price,
								];
							})}
						/>

					</div>
				</div>
			</div>
		</section>
	);
}
