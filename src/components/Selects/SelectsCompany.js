import React, { useEffect, useState } from 'react';
import api from '../../services/api';

// eslint-disable-next-line react/prop-types
export default function SelectsCompany({ setIdCompany, valueSelect, disabled }) {
	const [Companies, setCompanies] = useState([]);

	useEffect(() => {
		(async function() {
			const response = await api.get('/selects/type-services');
			setCompanies(response.data.data);
		})();
	}, []);

	// eslint-disable-next-line no-shadow
	async function handleSelect(id) {
		setIdCompany(id);
	}
	const CompaniesList = Companies.map(c => (
		<option value={c.id_user} key={c.id_user}>
			{c.name_user}
		</option>
	));
	return (
		<>
			<select
				disabled={disabled}
				required="required"
				className="form-control"
				name="idCompanhia"
				id="idCompanhia"
				value={valueSelect}
				onChange={event => handleSelect(event.target.value)}
			>
				<option value="">Escolha uma companhia</option>
				{CompaniesList}
			</select>
		</>
	);
}
