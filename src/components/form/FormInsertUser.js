import React from '/react';
import { useEffect } from 'react';
import api from '../../services/api';

export default function FormInsertUser() {
	useEffect(() => {
		(async function () {
			const response = api.get('/user');
		});
	}, []);

	return (
		<form>
			<label></label>
			<input></input>
		</form>
	);
}
