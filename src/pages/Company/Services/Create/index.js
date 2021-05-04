import React from 'react';
import FormServices from './FormServices';
import NavBar from '../../../../components/NavBar';

export default function Index() {
	return (
		<>
			<NavBar />
			<main>
				<FormServices />
			</main>
		</>
	);
}
