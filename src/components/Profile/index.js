import React from 'react';
import Profile from './Profile';
import NavBar from '../NavBar';

export default function Index() {
	return (
		<>
			<NavBar />
			<main>
				<Profile />
			</main>
		</>
	);
}
