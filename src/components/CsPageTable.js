
import React, { useState } from 'react';
import { Col, Table, FormGroup, ButtonGroup, Button, Input, Pagination, PaginationItem, PaginationLink, UncontrolledTooltip } from 'reactstrap';
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';

export const CsPageTable = ({ data = [], columns = [], setData }) => {

	const [replaceText, setReplaceText] = useState();

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		setGlobalFilter,
		canPreviousPage,
    canNextPage,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,

		state: { globalFilter, pageIndex },

	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: 0,
			 	pageSize: 10
			},
		},
		useGlobalFilter,
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

	}

	/*const onReplace = () => {

		setData(old =>
			old.map((row, index) => {
					return {
						...row,
						col1: row.col1.replace(globalFilter, replaceText)
					}
				})
		);
	}*/

	// Retourne les numéros des pages à afficher dans la pagination.
	//
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
			        }}
						/>
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
										const cellId = '_row_' + cell.row.id + '_' + cell.column.id;
										return (
											<React.Fragment>
												<td id={cellId} {...cell.getCellProps()}>
													{cell.render('Cell')}
												</td>
												{cell.value &&
													<UncontrolledTooltip placement='top' target={cellId}>
														{cell.value}
													</UncontrolledTooltip>
												}
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

export default CsPageTable
