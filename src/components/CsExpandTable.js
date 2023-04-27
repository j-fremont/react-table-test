
import React from 'react';
import { Col, Table, FormGroup, ButtonGroup, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { useTable, useExpanded } from 'react-table';

export const CsExpandTable = ({ data = [], columns = [], setData }) => {

	const onUpdate = (rowIndex, columnId, value) => {

		// When data gets updated with this function, set a flag
		// to disable all of the auto resetting
		//skipPageResetRef.current = true;

		setData(old =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex],
						[columnId]: value,
					}
				}
				return row
			})
		);

	}


	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,

	} = useTable(
		{
			columns,
			data,
			initialState: {

			},
			onUpdate,
		},
		useExpanded,
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
				<Table striped {...getTableProps()}>
					<thead>
						{headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th className={'col-w-' + column.width} {...column.getHeaderProps()}>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map(row => {
							prepareRow(row)
							return (
								<tr {...row.getRowProps()} onClick={onSelect}>
									{row.cells.map(cell => {
										return (
											<React.Fragment>
												<td {...cell.getCellProps()}>
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

export default CsExpandTable
