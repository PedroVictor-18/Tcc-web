import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { ImUserTie } from 'react-icons/im';
import { BsBuilding, BsCalendar } from 'react-icons/bs';

export const SideBarData = [
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
		path: 'empresas',
		dropDown: [
			{
				id: 1,
				title: 'Cadastrar Empresa',
				path: '/empresa/cadastro',
				icon: <AiFillHome />,
				cName: 'nav-text-item',
			},
			{
				id: 1,
				title: 'Visualizar Empresa',
				path: '/empresa/cadastro',
				icon: <AiFillHome />,
				cName: 'nav-text-item',
			},
			{
				id: 1,
				title: 'Atualizar Empresa',
				path: '/empresa/cadastro',
				icon: <AiFillHome />,
				cName: 'nav-text-item',
			},
			{
				id: 1,
				title: 'Desativar Empresa',
				path: '/empresa/cadastro',
				icon: <AiFillHome />,
				cName: 'nav-text-item',
			},
		],
	},
	{
		id: 3,
		title: 'Clientes',
		path: '/dash',
		icon: <ImUserTie />,
		cName: 'nav-text',
		dropDown: [
			{
				id: 1,
				title: 'Cadastrar Cliente',
				path: '/cliente/cadastro',
				icon: <AiFillHome />,
				cName: 'nav-text-item',
			},
			{
				id: 1,
				title: 'Visualizar Cliente',
				path: '/cliente/cadastro',
				icon: <AiFillHome />,
				cName: 'nav-text-item',
			},
			{
				id: 1,
				title: 'Atualizar Cliente',
				path: '/cliente/cadastro',
				icon: <AiFillHome />,
				cName: 'nav-text-item',
			},
			{
				id: 1,
				title: 'Desativar Cliente',
				path: '/cliente/cadastro',
				icon: <AiFillHome />,
				cName: 'nav-text-item',
			},
		],
	},
	{
		id: 3,
		title: 'Calendário',
		path: '/calendario',
		icon: <BsCalendar />,
		cName: 'nav-text',
	},
];
