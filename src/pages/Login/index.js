import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import { UserTypeActions } from '../../redux/ducks/userTypeReducer';
import { useDispatch } from 'react-redux';
import parseJwt from '../../helpers/parseJwt';
import Routes from '../../routes/data/Routes';
import RouteByPermission from '../../routes/data/RouteByPermission';
import { UserFunctions } from '../../redux/ducks/UserFunctionsReducer';

export default function Login() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorLogin, setErrorLogin] = useState('');
	const [disableButton, setDisableButton] = useState(false);
	const [buttonLogin, setButtonLogin] = useState('Entrar');

	function handleLogin(event) {
		setButtonLogin('Carregando...');
		setDisableButton(true);
		event.preventDefault();
		setErrorLogin('');
		(async function () {
			const response = await api.post('/login', {
				login: email,
				password: password,
			});

			if (response.data.error === false) {
				localStorage.setItem('@token', response.data.data);
				const tokenUsuario = parseJwt(response.data.data);
				dispatch(
					UserTypeActions.updateUserTypeIds(tokenUsuario.type_user)
				);
				dispatch(
					UserFunctions.updateActualUserFunctions(tokenUsuario.functions)
				);
				if (tokenUsuario.type_user !== 0) {
					localStorage.setItem(
						'@actualTypeId',
						tokenUsuario.type_user
					);
					dispatch(
						UserTypeActions.updateActualTypeId(
							tokenUsuario.type_user
						)
					);
					history.push(
						Routes.LOGGED_ROUTES(
							RouteByPermission[tokenUsuario.type_user]
						).HOME
					);
				}
			} else {
				alert(`${response.data.message}`);
				setErrorLogin(response.data.message);
			}
			setButtonLogin('Entrar');
			setDisableButton(false);
		})();
	}

	return (
		<section id="wrapper">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-lg-7 col-md-9">
						<div className="card" id="login-card">
							<div className="card-body">
								<form
									className="login_page_form"
									onSubmit={handleLogin}
								>
									<div className="row justify-content-center text-center">
										<div className="form-group col-10">
											<label htmlFor="loginEmail">
												<b> Login </b>
											</label>
											<input
												type="text"
												name="loginEmail"
												id="loginEmail"
												placeholder="Digite seu login"
												className="form-control"
												onChange={(event) =>
													setEmail(event.target.value)
												}
												required
											/>
										</div>
									</div>
									<div className="row justify-content-center text-center">
										<div className="form-group col-10">
											<label htmlFor="passwordLogin">
												<b> Senha </b>
											</label>
											<input
												type="password"
												name="passwordLogin"
												id="passwordLogin"
												placeholder="Digite a sua senha"
												className="form-control"
												onChange={(event) =>
													setPassword(
														event.target.value
													)
												}
												required
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
									<div className="row justify-content-center text-center">
										<div className="col-10 form-group">
											<button
												type="submit"
												disabled={disableButton}
												className="btn btn-primary btn-block"
												id="loginBtn"
											>
												{buttonLogin}
											</button>
										</div>
									</div>
									<div className="row justify-content-center text-center">
										<div className="col-10 form-group">
											<Link
												to={'/esqueceu-senha'}
												id="forgotpassword"
											>
												Esqueceu a Senha ?
											</Link>
										</div>
									</div>
									<div className="row justify-content-center text-center">
										<div className="col-10 form-group">
											<Link
												to={'/registro'}
												id="forgotpassword"
											>
												Cadastrar - se
											</Link>
										</div>
									</div>
								</form>
								<div className="row justify-content-center text-center">
									<div className="col-10 form-group"> </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
