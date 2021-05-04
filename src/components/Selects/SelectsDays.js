import React, { useEffect, useState } from 'react';
import api from '../../services/api';

// eslint-disable-next-line react/prop-types
export default function SelectsDays({ setIdDay, valueSelect, disabled }) {
	const [daysWeeks, setDaysWeeks] = useState([]);

	useEffect(() => {
		(async function() {
			const response = await api.get('/selects/days-weeks');
			setDaysWeeks(response.data.data);
		})();
	}, []);

	// eslint-disable-next-line no-shadow
	async function handleSelect(id) {
		setIdDay(id);
	}
	const daysWeeksList = daysWeeks.map(day => (
		<option value={day.id_days_week} key={day.id_days_week}>
			{day.day}
		</option>
	));
	return (
		<>
			<select
				disabled={disabled}
				required="required"
				className="form-control"
				name="IdDaysWeeks"
				id="IdDaysWeeks"
				value={valueSelect}
				onChange={event => handleSelect(event.target.value)}
			>
				<option value="">Escolha um Dia</option>
				{daysWeeksList}
			</select>
		</>
	);
}
