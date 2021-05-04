import React from 'react';
import { CSVLink } from 'react-csv';

export const ExportCSV = ({ header, csvData, fileName }) => {
	return (
		<CSVLink data={csvData} headers={header} filename={`${fileName}.csv`}>
			<button type="button" className="btn btn-warning">
				Exportar Planilha
			</button>
		</CSVLink>
	);
};
