import React, { useEffect, useState } from 'react';
import NavBar from '../../../components/NavBar';
import CalendarAdministrator from '../../../components/Calendar/CalendarAdministrator';
import './style.css';

export default function Index() {
	return (
		<>
			<NavBar />
			<main>
				<section className="background_page_form">
					<div className="container">
						<div className="row">
							<div className="card mt-3 calendar-full-screen">
								<Calendar />
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
