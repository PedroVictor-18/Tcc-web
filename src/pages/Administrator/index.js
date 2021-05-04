import React, { useEffect } from 'react';
import { BsBuilding } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Graphic from './Graphics/Graphic';
import '../../styles/color.css';
import './style.css';
import Routes from '../../routes/data/Routes';
import RouteByPermission from '../../routes/data/RouteByPermission';

export default function Index() {
	const userActualType = useSelector((state) => state.userType.actualType);

	return (
		<>
			<NavBar />
			<section className="background_page_form">
				<div className="container">
					<div className="row mt-3">
						<div className="col-12 col-md-6 col-lg-6">
							<div className="card">
								<div className="card-body">
									<Link
										to={() => {
											return {
												pathname: Routes.LOGGED_ROUTES(
													RouteByPermission[
														userActualType
													]
												).LIST_COMPANY,
											};
										}}
									>
										<div className="row">
											<div className="col-lg-3 col-5 headerDashCards">
												<div className="bg-blue">
													<div className="text-blue">
														<BsBuilding />
													</div>
												</div>
											</div>
											<div className="col-lg-9 col-7">
												<div className="content">
													<p className="item-title">
														Empresas
													</p>
													<p className="item-number">
														1
													</p>
												</div>
											</div>
										</div>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6 col-lg-6">
							<div className="card">
								<div className="card-body">
									<Link
										to={() => {
											return {
												pathname: Routes.LOGGED_ROUTES(
													RouteByPermission[
														userActualType
													]
												).LIST_CLIENT,
											};
										}}
									>
										<div className="row">
											<div className="col-lg-3 col-5 headerDashCards">
												<div className="bg-yellow">
													<div className="text-orange">
														<FaUserAlt />
													</div>
												</div>
											</div>
											<div className="col-lg-9 col-7">
												<div className="content">
													<p className="item-title">
														Cliente
													</p>
													<p className="item-number">
														1
													</p>
												</div>
											</div>
										</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="card mt-3">
						<Graphic />
					</div>
				</div>
			</section>
		</>
	);
}
