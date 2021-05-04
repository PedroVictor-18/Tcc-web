import React, { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import NavBar from '../../../components/NavBar';
import api from '../../../services/api';
import Calendar from '../../../components/Calendar/NewCalendar';
import './style.css';
import { useHistory } from 'react-router-dom';
import Routes from '../../../routes/data/Routes';
import parseJwt from '../../../helpers/parseJwt';
import RouteByPermission from '../../../routes/data/RouteByPermission';
import swal from 'sweetalert';

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
