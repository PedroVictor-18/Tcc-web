import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { ImUserTie } from 'react-icons/im';
import { BsBuilding, BsCalendar } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import ButtonLogout from './ButtonLogout';
import './style.css';
import { useSelector } from 'react-redux';
import Routes from '../../routes/data/Routes';
import RouteByPermission from '../../routes/data/RouteByPermission';

export default function SideBar() {
	const [sideBarActive, setSideBarActive] = useState(false);
	const userActualType = useSelector((state) => state.userType.actualType);
	const [SideBarData, setSideBarData] = useState([]);
	const [sideBar, setSideBar] = useState([]);

	const showSideBar = () => setSideBarActive(!sideBarActive);

	useEffect(() => {
		if (userActualType === 1) {
			setSideBarData([
				{
					id: 1,
					title: 'Home',
					path: '/',
					icon: <AiFillHome />,
					cName: 'nav-text',
				},
				{
					id: 2,
					title: 'Empresas',
					icon: <BsBuilding />,
					cName: 'nav-text',
					path: Routes.LOGGED_ROUTES(
						RouteByPermission[userActualType]
					).LIST_COMPANY,
				},
				{
					id: 3,
					title: 'Clientes',
					icon: <ImUserTie />,
					cName: 'nav-text',
					path: Routes.LOGGED_ROUTES(
						RouteByPermission[userActualType]
					).LIST_CLIENT,
				},
				{
					id: 3,
					title: 'Calendário',
					path: Routes.LOGGED_ROUTES(
						RouteByPermission[userActualType]
					).CALENDAR,
					icon: <BsCalendar />,
					cName: 'nav-text',
				},
			]);
		}
		if (userActualType === 2) {
			setSideBarData([
				{
					id: 1,
					title: 'Home',
					path: '/',
					icon: <AiFillHome />,
					cName: 'nav-text',
				},
				{
					id: 2,
					title: 'Perfil',
					icon: <ImUserTie />,
					cName: 'nav-text',
					path: Routes.LOGGED_ROUTES(
						RouteByPermission[userActualType]
					).PROFILE,
				},
				{
					id: 3,
					title: 'Calendário',
					path: Routes.LOGGED_ROUTES(
						RouteByPermission[userActualType]
					).CALENDAR,
					icon: <BsCalendar />,
					cName: 'nav-text',
				},
			]);
		}
		if (userActualType === 3) {
			setSideBarData([
				{
					id: 1,
					title: 'Home',
					path: '/',
					icon: <AiFillHome />,
					cName: 'nav-text',
				},
				{
					id: 2,
					title: 'Perfil',
					icon: <ImUserTie />,
					cName: 'nav-text',
					path: Routes.LOGGED_ROUTES(
						RouteByPermission[userActualType]
					).PROFILE,
				},
				{
					id: 3,
					title: 'Calendário',
					path: Routes.LOGGED_ROUTES(
						RouteByPermission[userActualType]
					).CALENDAR,
					icon: <BsCalendar />,
					cName: 'nav-text',
				},
			]);
		}
	}, [userActualType]);
	useEffect(() => {
		setSideBar(
			SideBarData.map(
				({ id, title, path, icon, cName, dropDown, index }) => (
					<>
						<li key={index} className={cName}>
							{dropDown ? (
								<a
									data-toggle="collapse"
									href={`#collaspse${path}`}
									role="button"
									id={path}
									aria-expanded="false"
									aria-controls={`collaspse${path}`}
									className="nav-link sidebar-link text-light p-2"
								>
									<span className="mr-3 sidebar-icons">
										{icon}
									</span>
									{title}
								</a>
							) : (
								<Link
									to={`${path}`}
									className="nav-link sidebar-link text-light p-2"
								>
									<span className="mr-3 sidebar-icons">
										{icon}
									</span>
									{title}
								</Link>
							)}
							<div
								className="collapse multi-collapse"
								id={`collaspse${path}`}
							>
								<div className="sidebar-item">
									{Array.isArray(dropDown) ? (
										<ul>
											{dropDown.map((subItem) => (
												<li
													className="submenusidebar"
													key={subItem.id}
												>
													<Link
														to={subItem.path}
														className={
															subItem.cName
														}
													>
														{subItem.title}
													</Link>
												</li>
											))}
										</ul>
									) : null}
								</div>
							</div>
						</li>
					</>
				)
			)
		);
	}, [SideBarData]);

	return (
		<>
			<IconContext.Provider value={{ color: '#fff' }}>
				<div className="navbar">
					<Link
						to="#"
						className="menu-bars"
						style={{ color: 'blue' }}
					>
						<FaBars
							className="menu-bars-navbar"
							onClick={showSideBar}
						/>
					</Link>
				</div>
				<nav className={sideBarActive ? 'nav-menu active' : 'nav-menu'}>
					<ul className="nav-menu-items">
						<li className="navbar-toggle">
							<Link
								to="#"
								className="menu-bars"
								onClick={showSideBar}
							>
								<AiOutlineClose />
							</Link>
						</li>
						{sideBar}
						<ButtonLogout />
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	);
}
