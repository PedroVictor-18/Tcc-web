import React from 'react';
import NavBar from '../../../../components/NavBar';
import RegisterClient from './RegisterClient';

export default function Index() {
	return (
		<>
			<NavBar />
			<section className="background_page_form">
				<div className="container">
					<div className="mt-3">
						<RegisterClient />
					</div>
				</div>
			</section>
		</>
	);
}
