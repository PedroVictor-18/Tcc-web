import React from 'react';
import NavBar from '../../../../components/NavBar';
import RegisterCompany from './RegisterCompany';

export default function Index() {
	return (
		<>
			<NavBar />
			<section className="background_page_form">
				<div className="container">
					<div className="mt-3">
						<RegisterCompany />
					</div>
				</div>
			</section>
		</>
	);
}
