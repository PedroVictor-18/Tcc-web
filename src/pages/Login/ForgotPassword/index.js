import React, { useState } from 'react';

export default function Index(){

	const [login,setLogin] = useState('');

	async function handleSubmit(event){

		event.preventDefault();
		console.log(login);

	}


	return (
		<section className="background_page_form">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-lg-7 col-md-9">
						<div className="card" id="login-card">
							<div className="card-body">
								<form
									className="login_page_form"
									onSubmit={handleSubmit}
								>
									<div className="row justify-content-center text-center">
										<div className="form-group col-10">
											<label htmlFor="loginEmail">
												<b> Email </b>
											</label>
											<input
												type="text"
												name="loginEmail"
												id="loginEmail"
												placeholder="Digite seu email"
												className="form-control"
												value={login}
												onChange={(event) =>
													setLogin(event.target.value)
												}
												required
											/>
										</div>
									</div>
									<div className="row justify-content-center text-center">
										<div className="col-10 form-group">
											<button
												type="submit"
												className="btn btn-primary btn-block"
												id="loginBtn"
											>
												Esqueceu Senha
											</button>
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