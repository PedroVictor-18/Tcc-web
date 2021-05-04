import React, { useState } from 'react';
import SelectsTypeServices from '../../../../components/Selects/SelectsTypeServices';
import api from '../../../../services/api';

export default function FormServices() {
	const [Price, setPrice] = useState('');
	const [Time, setTime] = useState('');
	const [Service, setService] = useState('');
	const [IdTypeService, setIdTypeService] = useState(null);
	const [Description, setDescription] = useState('');

	async function HandleSubmitServices(event) {
		event.preventDefault();
		const datapost = {
			price: Price,
			time: Time,
			service: Service,
			types_services_id_type_service: IdTypeService,
			description: Description
		};
		const { data } = await api.post(
			'/services/create-services',
			datapost
		);
		if (data.error === true) {
			alert(data.message);
		} else {
			alert(data.message);
		}
	}

	return (
		<div className="container">
			<div className="card mt-3">
				<div className="card-body">
					<form onSubmit={HandleSubmitServices}>
						<div className="row">
							<div className="col-12 col-md-4 col-lg-4 ">
								<label htmlFor="priceLabel">
									<b>Valor</b>
								</label>
								<div class="form-group input-group mb-2">
									<div class="input-group-prepend">
										<div class="input-group-text">R$</div>
									</div>
									<input
										type="text"
										class="form-control"
										id="price"
										placeholder="100,00"
										value={Price}
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
										value={Time}
										onChange={(event) =>
											setTime(event.target.value)
										}
									/>
								</div>
							</div>
							<div className="col-12 col-md-4 col-lg-4">
								<div className="form-group">
									<label htmlFor="servicesLabel">
										<b>Tipo de Serviço</b>
									</label>
									<SelectsTypeServices
										setIdTypeService={setIdTypeService}
										valueSelect={IdTypeService}
										required={true}
										disabled={false}

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
											value={Service}
											onChange={(event) =>
												setService(event.target.value)
											}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="serviceLabel">
								<b>Descrição</b>
							</label>

							<textarea
								type="text"
								class="form-control"
								id="inlineFormInputGroup"
								placeholder="Descrição"
								value={Description}
								onChange={(event) =>
									setDescription(event.target.value)
								}
							/>
						</div>

						<button type="submit" class="btn btn-primary">
							Cadastrar
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
