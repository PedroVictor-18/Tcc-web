import React, { useState, useEffect } from 'react';
import { ExportCSV } from '../Buttom/ExportCSV';
import './style.css';

/**
 * @param {{
    header: any[],
    body: any[][]
  }} props
 */
export default function({ header, body }) {
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [searchText, setSearchText] = useState('');
	const [page, setPage] = useState(1);
	const url = window.location.href;
	const arrayUrl = url.split('/');
	const fileName = arrayUrl[arrayUrl.length - 1];
	useEffect(() => setPage(1), [searchText]);
	/**
	 * @param {any[]} row
	 */
	function filterTable(row) {
		let find = false;
		for (let index = 0; index < row.length; index++) {
			find = String(row[index])
				.toLowerCase()
				.includes(searchText.toLowerCase());
			if (find) return true;
		}
		return false;
	}
	/**
	 * @return {any[]}
	 */
	function buildPageArray() {
		const numOfPages = Math.ceil(
			body.filter(filterTable).length / itemsPerPage
		);
		const pagesToDisplay = Array.from(Array(numOfPages).keys()).map(
			item => item + 1
		);
		if (pagesToDisplay.length <= 5) return pagesToDisplay;
		const newPagesToDisplay = [];
		if (page === 1) newPagesToDisplay.push(page);
		else if (page === 2) {
			newPagesToDisplay.push(1);
			newPagesToDisplay.push(page);
		} else if (page > 2) {
			newPagesToDisplay.push('...');
			newPagesToDisplay.push(page - 1);
			newPagesToDisplay.push(page);
		}
		if (page === numOfPages - 1) newPagesToDisplay.push(page + 1);
		else if (page <= numOfPages - 2) {
			newPagesToDisplay.push(page + 1);
			newPagesToDisplay.push('...');
		}
		return newPagesToDisplay;
	}
	return (
		<div className="row mb-3">
			<div className="col-12">
				<div className="row mt-3 ">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<select
								className="form-control"
								style={{ width: 'auto' }}
								value={itemsPerPage}
								onChange={event =>
									setItemsPerPage(event.target.value)
								}
							>
								<option>10</option>
								<option>25</option>
								<option>50</option>
								<option>100</option>
							</select>
						</div>
						<div className="form-group">
							<ExportCSV
								header={header}
								csvData={body}
								fileName={fileName}
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-group form-inline d-flex flex-sm-row flex-md-row-reverse">
							<input
								type="text"
								className="form-control"
								id="searchBox"
								value={searchText}
								placeholder="Pesquisar"
								onChange={event =>
									setSearchText(event.target.value)
								}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="col-12">
				<div className="table-responsive">
					<table className="table table-bordered table-hover table-sm">
						<thead>
							<tr>
								{header.map(item => (
									<th scope="col" className="text-center">
										{item}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{body
								.filter(filterTable)
								.slice(
									itemsPerPage * (page - 1),
									itemsPerPage * (page - 1) + itemsPerPage
								)
								.map(row => (
									<tr>
										{row.map(item => (
											<td>
												<div className="table-cell-content">
													{item}
												</div>
											</td>
										))}
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="col-12 d-flex flex-row-reverse">
				<div
					className="btn-group"
					role="group"
					aria-label="Basic example"
				>
					<button
						type="button"
						onClick={() => setPage(1)}
						className="btn btn-light"
					>
						&#8249;&#8249;
					</button>
					<button
						type="button"
						onClick={() => page !== 1 && setPage(page - 1)}
						className="btn btn-light"
					>
						&#8249;
					</button>
					{buildPageArray().map(itemPage => (
						<button
							type="button"
							disabled={itemPage === '...'}
							onClick={() =>
								itemPage !== '...' && setPage(itemPage)
							}
							className={`btn ${
								page === itemPage ? 'btn-primary' : 'btn-light'
							}`}
						>
							{itemPage}
						</button>
					))}
					<button
						type="button"
						onClick={() =>
							page !== Math.ceil(body.length / itemsPerPage) &&
							setPage(page + 1)
						}
						className="btn btn-light"
					>
						&#8250;
					</button>
					<button
						type="button"
						onClick={() =>
							setPage(Math.ceil(body.length / itemsPerPage))
						}
						className="btn btn-light"
					>
						&#8250;&#8250;
					</button>
				</div>
			</div>
		</div>
	);
}
