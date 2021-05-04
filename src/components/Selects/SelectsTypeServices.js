import React, { useEffect, useState } from 'react';
import api from '../../services/api';

// eslint-disable-next-line react/prop-types
export default function SelectsTypeServices({
	setIdTypeService,
	valueSelect,
	disabled,
	required,
}) {
	const [TypeServices, setTypeServices] = useState([]);

	useEffect(() => {
		(async function () {
			const response = await api.get('/selects/type-services');
			setTypeServices(response.data.data);
		})();
	}, []);

	// eslint-disable-next-line no-shadow
	async function handleSelect(id) {
		setIdTypeService(id);
	}
	const TypeServicesList = TypeServices.map((t) => (
		<option value={t.id_type_service} key={t.id_type_service}>
			{t.type_service}
		</option>
	));
	return (
		<>
			<select
				disabled={disabled}
				required={required}
				className="form-control"
				name="IdTipoServico"
				id="IdTipoServico"
				required={required}
				value={valueSelect}
				onChange={(event) => handleSelect(event.target.value)}
			>
				<option value="">Seleciona um tipo de serviço</option>
				{TypeServicesList}
			</select>
		</>
	);
}
