import React, { useState, useEffect } from 'react';
import parseJwt from '../../helpers/parseJwt';
import api from '../../services/api';
import { FcEditImage } from 'react-icons/fc';

export default function Profile() {
	const [Password, setPassword] = useState('');
	const [NameUser, setNameUser] = useState('');
	const [Email, setEmail] = useState('');
	const [PostCode, setPostCode] = useState('');
	const [Street, setStreet] = useState('');
	const [Number, setNumber] = useState('');
	const [District, setDistrict] = useState('');
	const [City, setCity] = useState('');
	const [State, setState] = useState('');
	const [Country, setCountry] = useState('');
	const [Contacts, setContacts] = useState([]);
	const [Cpf, setCpf] = useState('');
	const [Cnpj, setCnpj] = useState('');
	const [Disable, setDisable] = useState(true);

	async function loadClient() {
		const token = localStorage.getItem('@token');
		const tokenUsuario = parseJwt(token);
		const dataPost = { idUser: tokenUsuario.sub };
		const { data } = await api.post('/view/info-user', dataPost);
		if (data.error === true) {
			alert('Erro');
		} else {
			console.log(data.data);
			setNameUser(data.data.name_user);
			setEmail(data.data.email);
			setPostCode(data.data.postcode);
			setStreet(data.data.street);
			setNumber(data.data.number);
			setDistrict(data.data.district);
			setCity(data.data.city);
			setState(data.data.state);
			setCountry(data.data.country);
			setCpf(data.data.cpf);
			setCnpj(data.data.cpnj);
			setContacts(data.data.contacts);
		}
	}
	useEffect(() => {
		loadClient();
	}, []);

	function handleDisable() {
		setDisable(!Disable);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const dataPost = {
			password: Password,
			name_user: NameUser,
			email: Email,
			postCode: PostCode,
			street: Street,
			number: Number,
			district: District,
			city: City,
			state: State,
			country: Country,
			contacts: Contacts,
			cpf: Cpf,
			cnpj: Cnpj,
		};
		const { data } = await api.post('/user/update-user', dataPost);
		if (data.error === true) {
			alert('Erro');
		}
	}

	return (
		<main>
			<div className="container">
				<div className="card mt-3 ">
					<div className="card-header">
						<div className="d-flex justify-content-between">
							<h5>Perfil</h5>
							<button
								type="button"
								className="btn btn-link"
								onClick={() => handleDisable()}
							>
								<FcEditImage />
							</button>
						</div>
					</div>
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label for="exampleInputEmail1">Email</label>
								<input
									disabled={Disable}
									type="email"
									class="form-control"
									id="Email1"
									placeholder="Digite seu Nome Completo"
									className="form-control"
									value={Email}
									onChange={(event) =>
										setEmail(event.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label for="exampleInputPassword1">
									Password
								</label>
								<input
									disabled={Disable}
									type="password"
									class="form-control"
									id="exampleInputPassword1"
									placeholder="Password"
									value={Password}
									onChange={(event) =>
										setPassword(event.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label for="Nome">Nome do Usuário</label>
								<input
									disabled={Disable}
									type="text"
									class="form-control"
									id="nameUser"
									value={NameUser}
									onChange={(event) =>
										setNameUser(event.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label for="cep">Cep</label>
								<input
									disabled={Disable}
									type="text"
									class="form-control"
									id="postCode"
									value={PostCode}
									onChange={(event) =>
										setPostCode(event.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label for="Rua">Rua</label>
								<input
									disabled={Disable}
									type="text"
									class="form-control"
									id="street"
									value={Street}
									onChange={(event) =>
										setStreet(event.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label for="Número">Número</label>
								<input
									disabled={Disable}
									type="text"
									class="form-control"
									id="number"
									value={Number}
									onChange={(event) =>
										setNumber(event.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label for="Bairro">Bairro</label>
								<input
									disabled={Disable}
									type="text"
									class="form-control"
									id="district"
									value={District}
									onChange={(event) =>
										setDistrict(event.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label for="Cidade">Cidade</label>
								<input
									disabled={Disable}
									type="text"
									class="form-control"
									id="city"
									value={City}
									onChange={(event) =>
										setCity(event.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label for="Estado">Estado</label>
								<input
									disabled={Disable}
									type="text"
									class="form-control"
									id="state"
									value={State}
									onChange={(event) =>
										setState(event.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label for="País">País</label>
								<input
									disabled={Disable}
									type="text"
									class="form-control"
									id="country"
									value={Country}
									onChange={(event) =>
										setCountry(event.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label for="cpf">Cpf</label>
								<input
									disabled={Disable}
									type="text"
									class="form-control"
									id="cpf"
									value={Cpf}
									onChange={(event) =>
										setCpf(event.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label for="cnpj">Cnpj</label>
								<input
									disabled={Disable}
									type="text"
									class="form-control"
									id="cnpj"
									value={Cnpj}
									onChange={(event) =>
										setCnpj(event.target.value)
									}
									required
								/>
							</div>

							<div className="form-group">
								<button
									type="submit"
									className="btn btn-danger btn-block"
									id="cancelCad"
								>
									Alterar
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
