
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Col, Table, FormGroup, ButtonGroup, Button, Input, Pagination, PaginationItem, PaginationLink, UncontrolledTooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useExpanded} from 'react-table';


export const CsTable = ({ data = [], columns = [], offset = false, setData }) => {


	const [replaceText, setReplaceText] = useState();
	const [offsetValue, setOffsetValue] = useState();

	//const skipPageResetRef = useRef()




	const onUpdate = (rowIndex, columnId, value) => {

		console.log(rowIndex + ' - ' + columnId + ' = ' + value);

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

	/*useEffect(() => {
   // After the table has updated, always remove the flag
   skipPageResetRef.current = false;
 })*/


	const onReplace = () => {


		setData(old =>
			old.map((row, index) => {
					return {
						...row,
						col1: row.col1.replace(globalFilter, replaceText)
					}
				})
		);





	}



	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		//rows,
		page,
		prepareRow,

		setGlobalFilter,


		canPreviousPage,
    canNextPage,
		pageCount,


		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { globalFilter, pageIndex, pageSize },




	} = useTable(
		{
			columns,
			data,

			//autoResetExpanded: !skipPageResetRef.current,

			initialState: {
				pageIndex: 0,
			 	pageSize: 10
			},

			onUpdate,


		},

		useGlobalFilter,
		//useExpanded,
		usePagination,



	);

	const onSelect = (e) => {

		const selectedRows = document.getElementsByClassName('selected-row');

		for (const selectedRow of selectedRows) {
			selectedRow.classList.remove('selected-row');
		}



		e.currentTarget.className = "selected-row";



	}

	const onSave = () => {

		console.log(data);

	}

	const onOffset = () => {



	}

	// Retourne les numéros des pages à afficher dans la pagination.

	const getPages = () => {

		let pages = [];

		// Retourne les deux voisins à droite et à gauche de pageIndex.
		// Ex: pageIndex=12 => [10, 11, 12, 13, 14].
		for (let i=pageIndex-2; i<=pageIndex+2; i++) {
			pages.push(i);
		}

		// Retire les index < 0 éventuellent créés par le fenêtrage précédent.
		if (pages.includes(-1)) {
			pages = pages.filter(p => p >= 0);
		}

		// Retire les index > pageCount éventuellent créés par le fenêtrage précédent.
		if (pages.includes(pageCount)) {
			pages = pages.filter(p => p < pageCount);
		}

		// Ajoute éventuellement les boutons [1] et [...] en début de pagination.
		if (pageIndex > 2) {
			pages.unshift(-1);
			pages.unshift(0);
		}

		// Ajoute éventuellement les boutons [...] et [pageCount] en fin de pagination.
		if (pageIndex < pageCount-3) {
			pages.push(-1);
			pages.push(pageCount-1);
		}

		return pages;
	}


	function GlobalFilter({
		globalFilter,
		setGlobalFilter,
	}) {

		const [value, setValue] = useState(globalFilter);

		const onChange = useAsyncDebounce(value => {
			setGlobalFilter(value || undefined);
		}, 1000)

		return (
			<Input
				style={{marginRight: '10px'}}
				placeholder={'Search...'}
				value={value || ''}
				onChange={e => {
					setValue(e.target.value);
					onChange(e.target.value);

        }} />


		)

	}







	return (
		<React.Fragment>
			<FormGroup style={{marginTop: '10px'}} row>
				<Col md={6}>
					<ButtonGroup>
						<GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
						<Input
							style={{marginRight: '10px'}}
							placeholder={'Replace...'}
							value={replaceText || ''}
							onChange={e => {
								setReplaceText(e.target.value);


			        }} />
						<Button color="light" onClick={onReplace}><FontAwesomeIcon icon={faSync} /></Button>
						{offset &&
							<React.Fragment>
								<Input
									type={'number'}
									style={{marginRight: '10px'}}
									placeholder={'Offset...'}
									value={offsetValue || ''}
									onChange={e => {
										setOffsetValue(e.target.value);


					        }} />
								<Button color="light" onClick={onOffset}><FontAwesomeIcon icon={faSync} /></Button>
							</React.Fragment>



						}

					</ButtonGroup>

				</Col>
				<Col md={6} />
			</FormGroup>
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
						{page.map(row => {
							prepareRow(row)
							return (
								<tr {...row.getRowProps()} onClick={onSelect}>
									{row.cells.map(cell => {
										//console.log(cell.render('Cell'));
										//const cellId = '_row_' + cell.row.id + '_' + cell.column.id;
										const cellId = '' + cell.row.id + '_' + cell.column.id;
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
				<Col md={6}>
					<Pagination>
	  				<PaginationItem disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
	    				<PaginationLink first />
						</PaginationItem>
						<PaginationItem disabled={!canPreviousPage} onClick={() => previousPage()}>
							<PaginationLink previous />
						</PaginationItem>
						{getPages().map(page => (
							page===-1 ?
							<PaginationItem active={false}>
								<PaginationLink>{'...'}</PaginationLink>
						  </PaginationItem>
							:
							<PaginationItem active={page===pageIndex ? true : false} onClick={() => gotoPage(page)}>
								<PaginationLink>{page+1}</PaginationLink>
						  </PaginationItem>
						))}
						<PaginationItem disabled={!canNextPage} onClick={() => nextPage()}>
							<PaginationLink next />
						</PaginationItem>
						<PaginationItem disabled={!canNextPage} onClick={() => gotoPage(pageCount-1)}>
							<PaginationLink last />
						</PaginationItem>
					</Pagination>
				</Col>
			</FormGroup>
		</React.Fragment>
	)

}

/*
{cell.value &&
	<UncontrolledTooltip placement='top' target={cellId}>
		{cell.value}
	</UncontrolledTooltip>
}
*/

export default CsTable
