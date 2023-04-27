
import React, { useState } from 'react';
import { Col, Table, FormGroup, ButtonGroup, Button, Input } from 'reactstrap';
import ReactTable from 'react-table';

import { useTable, useBlockLayout, useResizeColumns, useAsyncDebounce } from 'react-table';

export const CsResizeTable = ({ data = [], columns = [], setData }) => {

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,

		state,

		resetResizing,

	} = useTable(
		{
			columns,
			data,
			initialState: {

			},
		},
		useBlockLayout,
		useResizeColumns,
	);

	const onSelect = (e) => {

		const selectedRows = document.getElementsByClassName('selected-row');
		for (const selectedRow of selectedRows) {
			selectedRow.classList.remove('selected-row');
		}
		e.currentTarget.className = "selected-row";
	}

	const onSave = () => {

	}

	return (
		<React.Fragment>
			<FormGroup>

			<Table size={'sm'} striped {...getTableProps()} style={{ height: '500px', overflow: 'auto' }}>
				<thead style={{
					backgroundColor: 'white',
    position: 'sticky',
    top: '0px',
    margin: '0 0 0 0'
}}>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th className={'col-w-' + column.width} {...column.getHeaderProps()}>
									{column.render('Header')}

									<div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />


								</th>
							))}
						</tr>
					))}
				</thead>


				<tbody style={{
					height: '500px',
	    borderRadius: '20px',
	    height: '500px',
	    padding: '0 10px 10px 10px',
	    overflowY: 'scroll'
	}}


				{...getTableBodyProps()}>
					{rows.map(row => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()} onClick={onSelect}>
								{row.cells.map(cell => {
									const cellId = '_row_' + cell.row.id + '_' + cell.column.id;
									return (
										<React.Fragment>
											<td id={cellId} {...cell.getCellProps()}>
												{cell.render('Cell')}
											</td>
										</React.Fragment>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</Table>



			</FormGroup>
			<FormGroup row>
				<Col md={6}>
					<ButtonGroup>
						<Button color='primary' onClick={onSave}>{'Enregistrer'}</Button>
					</ButtonGroup>
				</Col>
				<Col md={6} />
			</FormGroup>
		</React.Fragment>
	)

}

/*

*/
export default CsResizeTable
