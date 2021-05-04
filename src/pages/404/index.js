import React from 'react';
import { Link } from 'react-router-dom';

export default function index() {
	return (
		<div className="error-404">
			<div className="container">
				<Link to="/">
					<button
						type="button"
						className="btn btn-primary btn-block button1"
					>
						Voltar para página principal
					</button>
				</Link>
			</div>
		</div>
	);
}
