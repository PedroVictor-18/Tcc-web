import React, { useState } from 'react';
import NavBar from '../../../components/NavBar';
import ListServices from './ListServices';

export default function Index() {
	return (
		<>
			<NavBar />
			<main>
				<ListServices />
			</main>
		</>
	);
}
