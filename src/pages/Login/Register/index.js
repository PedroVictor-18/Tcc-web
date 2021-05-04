import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import cep from 'cep-promise';
import api from '../../../services/api';
import './style.css';

export default function Index() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [nameUser, setNameUser] = useState('');
	const [email, setEmail] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [typeUsersId, setTypeUsersId] = useState('');
	const [postCode, setPostCode] = useState('');
	const [street, setStreet] = useState('');
	const [number, setnumber] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [district, setDistrict] = useState('');
	const [country, setCountry] = useState('');
	const [dddTel, setDddTel] = useState('');
	const [dddCel, setDddCel] = useState('');
	const [telNumber, setTelNumber] = useState('');
	const [celNumber, setCelNumber] = useState('');
	const [cpf, setCpf] = useState('');
	const [cnpj, setCnpj] = useState('');
	const [errorLogin, setErrorLogin] = useState('');
	const [disableButton, setDisableButton] = useState(false);
	const [cepNotFound, setCepNotFound] = useState(false);

	const [buttonRegister, setButtonRegister] = useState('Registrar');
	const history = useHistory();

	async function handleSubmit(event) {
		setButtonRegister('Carregando...');
		setDisableButton(true);
		event.preventDefault();
		setErrorLogin('');
		const data = {
			login,
			password,
			nameUser,
			email,
			birthDate,
			typeUsersId,
			postCode,
			street,
			number,
			district,
			city,
			state,
			country,
			dddTel,
			dddCel,
			telNumber,
			celNumber,
			cpf,
			cnpj,
		};
		const response = await api.post('/user/create-user', data);
		console.log(response);
		if (response.data.error === false) {
			history.push('/login');
			alert(response.data.data);
		} else {
			alert(`${response.data.message}`);
			setErrorLogin(response.data.message);
		}
		setButtonRegister('Registrar');
		setDisableButton(false);
	}

	async function handleCEP(e) {
		e.preventDefault();
		cep(postCode)
			.then((dataPostCode) => {
				console.log(dataPostCode.neighborhood);
				if (
					dataPostCode.neighborhood === '' ||
					dataPostCode.street === '' ||
					dataPostCode.district === '' ||
					dataPostCode.state === '' ||
					dataPostCode.city === ''
				) {
					setCepNotFound(false);
				} else {
					setCepNotFound(true);
				}

				setDistrict(dataPostCode.neighborhood);
				setState(dataPostCode.state);
				setStreet(dataPostCode.street);
				setCity(dataPostCode.city);
			})
			.catch((error) => {
				console.log(`error: ${error}`);
				setCepNotFound(false);
				alert('ATENÇÃO', 'Cep não encontrado', 'warning');
			});
	}

	async function handleCancel(event) {
		event.preventDefault();
		setState('');
		setLogin('');
		setPassword('');
		setNameUser('');
		setEmail('');
		setBirthDate('');
		setTypeUsersId('');
		setPostCode('');
		setStreet('');
		setnumber('');
		setCity('');
		setState('');
		setDistrict('');
		setCountry('');
		setDddTel('');
		setDddCel('');
		setTelNumber('');
		setCelNumber('');
		setCpf('');
		setCnpj('');
		setErrorLogin('');

		history.push('/');
	}

	return (
		<section className="background_page_form">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-lg-10 col-md-10">
						<div className="card" id="login-card">
							<form
								className="login_page_form"
								onSubmit={handleSubmit}
							>
								<div className="card-body">
									<div className="row justify-content-center">
										<div className="form-group col-12 col-md-9 col-lg-9">
											<label htmlFor="name">
												<b> Nome Completo </b>
											</label>

											<input
												type="text"
												name="name"
												id="name"
												placeholder="Digite seu Nome Completo"
												className="form-control"
												value={nameUser}
												onChange={(event) =>
													setNameUser(
														event.target.value
													)
												}
												required
											/>
										</div>

										<div className="form-group col-12 col-md-3 col-lg-3">
											<label htmlFor="DateBirth">
												<b> Data Nascimento </b>
											</label>

											<InputMask
												mask="99/99/9999"
												type="text"
												name="DateBirth"
												id="DateBirth"
												placeholder="DD/MM/AAAA"
												className="form-control"
												value={birthDate}
												onChange={(event) =>
													setBirthDate(
														event.target.value
													)
												}
												required
											/>
										</div>
									</div>

									<div className="row justify-content-start form-group">
										<div className="col-12 col-md-6 col-lg-6">
											<label htmlFor="TypeUsers">
												<b> Tipo de Usuário </b>
											</label>

											<select
												required
												className="form-control"
												value={typeUsersId}
												onChange={(event) =>
													setTypeUsersId(
														event.target.value
													)
												}
											>
												<option value="">
													Escolha um tipo de usuário
												</option>

												<option value="2">
													Empresa
												</option>

												<option value="3">
													Usuário Comum
												</option>
											</select>
										</div>
									</div>

									<div className="row justify-content-start">
										<div className="form-group col-12 col-md-6 col-lg-6">
											{typeUsersId === '2' && (
												<>
													<label htmlFor="cpf">
														<b> CNPJ </b>
													</label>

													<InputMask
														mask="99.999.999/9999-99"
														type="text"
														name="cpf"
														id="cpf"
														placeholder="Digite seu CNPJ"
														className="form-control"
														onChange={(event) =>
															setCnpj(
																event.target
																	.value
															)
														}
														required
													/>
												</>
											)}

											{typeUsersId === '3' && (
												<>
													<label htmlFor="cpf">
														<b> CPF </b>
													</label>

													<InputMask
														mask="999.999.99-99"
														type="text"
														name="cpf"
														id="cpf"
														placeholder="Digite seu CPF"
														className="form-control"
														onChange={(event) =>
															setCpf(
																event.target
																	.value
															)
														}
														required
													/>
												</>
											)}
										</div>
									</div>

									<div className="row justify-content-center">
										<div className="form-group col-12 col-md-6 col-lg-6">
											<label htmlFor="Login">
												<b> Login </b>
											</label>

											<input
												type="text"
												name="Login"
												id="Login"
												placeholder="Digite seu login"
												className="form-control"
												value={login}
												onChange={(event) =>
													setLogin(event.target.value)
												}
												required
											/>
										</div>

										<div className="form-group col-12 col-md-6 col-lg-6">
											<label htmlFor="DateBirth">
												<b> Senha </b>
											</label>

											<input
												type="password"
												name="password"
												id="password"
												placeholder="Senha"
												className="form-control"
												value={password}
												onChange={(event) =>
													setPassword(
														event.target.value
													)
												}
												required
											/>
										</div>
									</div>

									<div className="row justify-content-start">
										<div className="form-group col-12 col-md-6 col-lg-6">
											<label htmlFor="Email">
												<b> E - mail </b>
											</label>

											<input
												type="text"
												name="Email"
												id="Email"
												placeholder="Digite seu E-mail"
												className="form-control"
												value={email}
												onChange={(event) =>
													setEmail(event.target.value)
												}
												required
											/>
										</div>
									</div>

									<div className="row justify-content-start">
										<div className="form-group col-2">
											<label htmlFor="ddd">
												<b> DDD Telefone </b>
											</label>

											<InputMask
												mask="(99)"
												required
												name="ddd"
												id="ddd"
												className="form-control"
												placeholder="(XX)"
												value={dddTel}
												onChange={(event) =>
													setDddTel(
														event.target.value
													)
												}
											/>
										</div>

										<div className="form-group col-2">
											<label htmlFor="telNumber">
												<b> Telefone </b>
											</label>

											<InputMask
												mask="9999-9999"
												required
												name="telNumber"
												id="telNumber"
												className="form-control"
												placeholder="99999-9999"
												value={telNumber}
												onChange={(event) =>
													setTelNumber(
														event.target.value
													)
												}
											/>
										</div>
									</div>

									<div className="row justify-content-start">
										<div className="form-group col-2">
											<label htmlFor="dddCel">
												<b> DDD Celular </b>
											</label>

											<InputMask
												mask="(99)"
												required
												name="dddCel"
												id="dddCel"
												className="form-control"
												placeholder="(XX)"
												value={dddCel}
												onChange={(event) =>
													setDddCel(
														event.target.value
													)
												}
											/>
										</div>

										<div className="form-group col-2">
											<label htmlFor="cel">
												<b> Número Celular </b>
											</label>

											<InputMask
												mask="99999-9999"
												required
												name="cel"
												id="cel"
												className="form-control"
												placeholder="99999-9999"
												value={celNumber}
												onChange={(event) =>
													setCelNumber(
														event.target.value
													)
												}
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-12 col-md-4 col-lg-4 form-group">
											<p>
												<b> CEP </b>
											</p>

											<div className="input-group mb-3">
												<InputMask
													mask="99999-999"
													required
													type="text"
													name="postCode"
													id="postCode"
													className="form-control"
													placeholder="XXXXX-XXX"
													value={postCode}
													onChange={(event) =>
														setPostCode(
															event.target.value
														)
													}
												/>

												<div className="input-group-append">
													<button
														className="btn btn-success btn-block"
														type="button"
														onClick={handleCEP}
													>
														<FaSearch />
													</button>
												</div>
											</div>
										</div>

										<div className="col-12 col-md-8 col-lg-8 form-group">
											<p>
												<b> Logradouro </b>
											</p>

											<input
												required
												disabled={cepNotFound}
												type="text"
												name="street"
												id="street"
												className="form-control"
												placeholder="Digite o Logradouro"
												value={street}
												onChange={(event) =>
													setStreet(
														event.target.value
													)
												}
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-12 col-md-4 col-lg-4 form-group">
											<p>
												<b> Número </b>
											</p>

											<input
												required
												type="text"
												name="lblNumero"
												id="lblNumero"
												className="form-control"
												placeholder="Ex: SN, 123"
												value={number}
												onChange={(event) =>
													setnumber(
														event.target.value
													)
												}
											/>
										</div>

										<div className="col-12 col-md-4 col-lg-4 form-group">
											<p>
												<b> Bairro </b>
											</p>

											<input
												required
												disabled={cepNotFound}
												type="text"
												name="dis"
												id="lblBairro"
												className="form-control"
												placeholder="Digite o Bairro"
												value={district}
												onChange={(event) =>
													setDistrict(
														event.target.value
													)
												}
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-12 col-md-8 col-lg-8 form-group">
											<p>
												<b> Cidade </b>
											</p>

											<input
												required
												disabled={cepNotFound}
												type="text"
												name="lblNomeCidade"
												id="lblNomeCidade"
												className="form-control"
												placeholder="Digite a Cidade"
												value={city}
												onChange={(event) =>
													setCity(event.target.value)
												}
											/>
										</div>

										<div className="col-12 col-md-4 col-lg-4 form-group">
											<p>
												<b> UF </b>
											</p>

											<input
												required
												disabled={cepNotFound}
												maxLength="2"
												type="text"
												name="lblUFCidade"
												id="lblUFCidade"
												className="form-control"
												placeholder="Digite o UF"
												value={state}
												onChange={(event) =>
													setState(event.target.value)
												}
											/>
										</div>

										<div className="col-12 col-md-4 col-lg-4 form-group">
											<p>
												<b> País </b>
											</p>

											<input
												required
												type="text"
												name="lblUFCidade"
												id="lblUFCidade"
												className="form-control"
												placeholder="Nome do País"
												value={country}
												onChange={(event) =>
													setCountry(
														event.target.value
													)
												}
											/>
										</div>
									</div>

									<div className="row justify-content-center">
										<div className="form-group col-10">
											<span className="errorLogin">
												{errorLogin}
											</span>
										</div>
									</div>
								</div>

								<div className="card-footer">
									<div className="row justify-content-center">
										<div className="col-12 col-lg-6 col-md-6 form-group">
											<button
												type="submit"
												disabled={disableButton}
												className="btn btn-primary btn-block"
												id="loginBtn"
											>
												{buttonRegister}
											</button>
										</div>

										<div className="col-12 col-lg-6 col-md-6 form-group">
											<button
												type="button"
												disabled={disableButton}
												className="btn btn-danger btn-block"
												id="cancelCad"
												onClick={handleCancel}
											>
												Cancelar
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
