
import React, { useState, useEffect } from 'react';
import { Col, Table, FormGroup, FormText, ButtonGroup, Button, Input, Pagination, PaginationItem, PaginationLink, UncontrolledTooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faSearch, faSync, faPlus } from '@fortawesome/free-solid-svg-icons'

import '../cs-table.css';

export const CsTable = ({ height, data = [], columns = [], options={}, save, applyOffset }) => {


	const [rows, setRows] = useState([]);



	const [searchText, setSearchText] = useState(''); // Texte recherché.
	const [searchPositions, setSearchPositions] = useState([]); // Liste des positions dans lesquelles le texte est trouvé. Une position = un nom de colonne (key + un index de ligne (pos).
	const [shiftPositions, setShiftPositions] = useState([]); // Liste des positions pas encore parcourues.
	const [currentPosition, setCurrentPosition] = useState({}); // Position courante.

	const [offset, setOffset] = useState(0);

	useEffect(() => {

		// Ajout des effets pour le resizing des colonnes.
		document.addEventListener('mousemove', mouseMove);
		document.addEventListener('mouseup', mouseUp);
		// Initialisation des className pour la sélection d'une ligne.
		initializeOnClickOnTableRows();


	});


	useEffect(() => {


		setRows(data);


	}, [data]);



	let currentHeader, nextHeader, currentHeaderWidth, nextHeaderWidth, currentCells=[], nextCells=[], pageX;





	// Fonctions pour le resizing des colonnes.
	//
	const mouseDown = (e) => {
		const table = document.getElementById('tableId');
		const cells = table.getElementsByClassName('cs-table-cell');
		currentHeader = e.target.parentElement;
		nextHeader = currentHeader.nextElementSibling;
		pageX = e.pageX;
		// Resize de la colonne à droite.
		if (nextHeader) {
			nextHeaderWidth = nextHeader.offsetWidth
			const nextField = nextHeader.getAttribute('field');
			nextCells = [...cells].filter(c => c.getAttribute('field')===nextField);
		}
		// Cellule header + liste des cellules row..
		currentHeaderWidth = currentHeader.offsetWidth
		const currentField = currentHeader.getAttribute('field');
		currentCells = [...cells].filter(c => c.getAttribute('field')===currentField);
	}

	const mouseMove = (e) => {
		if (currentHeader) {
			var diffX = e.pageX - pageX;
			// Resize de la colonne à droite.
			if (nextHeader) {
				nextHeader.style.maxWidth = (nextHeaderWidth - diffX) + 'px';
				nextCells.forEach(c => c.style.maxWidth = (nextHeaderWidth - diffX) + 'px')
			}
			// Resize de la colonne courante.
			currentHeader.style.maxWidth = (currentHeaderWidth + diffX) + 'px';
			currentCells.forEach(c => c.style.maxWidth = (currentHeaderWidth + diffX) + 'px')
		}
	}

	const mouseUp = () => {
		currentHeader = undefined;
		nextHeader = undefined;
		pageX = undefined;
		nextHeaderWidth = undefined;
		currentHeaderWidth = undefined;
		currentCells = [];
		nextCells = [];
	}

	// Fonctions pour le tooltip.
	//
	const mouseOver = (e, innerHTML) => {
		const tooltip = document.getElementById("tooltip");
		const x = e.clientX, y = e.clientY;
		tooltip.style.top = (y + 10) + 'px';
		tooltip.style.left = (x) + 'px';
		tooltip.style.display = 'block';
		tooltip.innerHTML = innerHTML;
	}

	const mouseOut = (e) => {
		const tooltip = document.getElementById("tooltip");
		tooltip.style.display = 'none';
	}

	// Fonctions pour la sélection d'une ligne.
	//
	const initializeOnClickOnTableRows = () => {
		const treeTableRows = document.getElementsByClassName('cs-table-row');
		for (const treeTableRow of treeTableRows) {
			treeTableRow.onclick = (e) => { onClickOnTableRow(e) };
		}
	}

	const unclickAllTableRows = () => {
		const selectedRows = document.getElementsByClassName('cs-table-row-selected');
		for (const selectedRow of selectedRows) {
			selectedRow.classList.remove('cs-table-row-selected');
			selectedRow.className = "cs-table-row";
		}
	}

	const onClickOnTableRow = (e) => {
		unclickAllTableRows();
		e.currentTarget.className = "cs-table-row-selected";
	}

	// Fonctions pour la recherche de texte.
	//
	const onSearch = () => {

		if (searchText) {

			if (searchPositions.length) {

				if (shiftPositions.length) {

					// Il reste des positions pas encore parcourues. On continue leur parcours.
					const position = shiftPositions.shift();
					if (position) {
						setCurrentPosition(position);
						scrollTo(position.pos);
					} else {
						setShiftPositions([...searchPositions]);
					}
				} else {
					// Il n'y a plus de positions à parcourir. On régénère la liste.
					setShiftPositions([...searchPositions]);
					setCurrentPosition({});
				}

			} else {
				// Retounr un array de { key, pos }.
				// key : property de l'objet où à été trouvé le texte.
				// pos : index de l'array où à été trouvé le texte.
				const positions = rows.reduce((acc, val, idx) => {
					acc.push(...Object.keys(val).filter(k => val[k].includes(searchText)).map(k => ({ key: k, pos: idx })));
					return acc;
				}, []);
				setSearchPositions(positions);
				setShiftPositions([...positions]);
			}
		}
	}

	const onChangeSearchText = (e) => {
		setSearchText(e.target.value);
		setSearchPositions([]);
		setShiftPositions([]);
		setCurrentPosition({});
	}

	const scrollTo = (position) => {
		const viewport = document.getElementsByClassName('cs-table-viewport')[0];
		viewport.scrollTop = position*26;
	}

	const cellClassName = (pos, column) => {
		return 'cs-table-cell' + (
			currentPosition.key===column.field && currentPosition.pos===pos ? ' cs-table-cell-search-current' : (
				searchPositions.find(p => p.key===column.field && p.pos===pos) ? ' cs-table-cell-search' : ''
			)
		)
	}

	const isEmpty = (object) => {
		return !object || Object.keys(object).length===0;
	}

	const searchOccurenceText = () => {

		if (isEmpty(currentPosition)) {
			return false;
		} else {
			const numberOfSearch = searchPositions.length;
			const numberOfShift = shiftPositions.length;
			return (numberOfSearch-numberOfShift) + ' sur ' + numberOfSearch;
		}
	}

	// Fonctions pour l'offset.
	//
	const onChangeOffset = (event) => {
		setOffset(event.target.value);
	}

	const onApplyOffset = () => {

		applyOffset(offset);
	}

	// Fonctions pour la souvegarde.
	//
	const onSave = () => {

		save();
	}


	return (

		<React.Fragment>


			<ButtonGroup style={{ marginTop: '10px', marginBottom: '10px' }} row>

				{options.add &&
					<Button color="light" style={{ marginRight: '10px' }} onClick={onSearch}><FontAwesomeIcon icon={faPlus} /></Button>
				}

					{options.search &&
						<React.Fragment>
							<Input
								bsSize={'sm'}
								style={{ marginRight: '10px', width: '250px' }}
								placeholder={'Search...'}
								value={searchText || ''}
								onChange={onChangeSearchText} />
							<Button color="light" style={{ marginRight: '10px' }} onClick={onSearch}><FontAwesomeIcon icon={faSearch} /></Button>
							{searchOccurenceText() && <FormText color="muted" style={{ width: '100px', marginTop: '10px' }}>{searchOccurenceText()}</FormText>}
						</React.Fragment>
					}
					{options.offset &&
						<React.Fragment>
							<Input
								type='number'
								bsSize={'sm'}
								style={{ marginRight: '10px', width:'100px' }}
								placeholder={'Offset...'}
								value={offset || ''}
								onChange={onChangeOffset} />
							<Button color="light" onClick={onApplyOffset} ><FontAwesomeIcon icon={faSync} /></Button>
						</React.Fragment>
					}


			</ButtonGroup>

			<FormGroup>

				<div className='cs-table' id="tableId">

					<div className='cs-table-header'>

							{columns.map(column => (
								column.type==='text' ?
									<div className='cs-table-header-cell' field={column.field} style={{ flexBasis: column.basis }}>
										{column.name}
										{column.type==='text' && <div className='cs-resizer' onMouseDown={mouseDown} />}
									</div>
									:
									<div className='cs-table-header-button' />
							))}

					</div>

					<div className='cs-table-viewport' style={{ height: height + 'px' }}>

						<div className='cs-table-rows'>

							<div className='cs-table-mover'>

								{rows.map((row, pos) => {

									return (
										<div className='cs-table-row'>
											{columns.map(column => (
												column.type==='text' ?
													<div className={cellClassName(pos, column)} field={column.field} style={{ flexBasis: column.basis }} onMouseOver={(e) => mouseOver(e, row[column.field])} onMouseOut={mouseOut}>
														{row[column.field]}
													</div>
													:
													<div className='cs-table-cell-button' onClick={column.onClick}><FontAwesomeIcon size="s" icon={column.style} /></div>
											))}
										</div>
									)

								})}

							</div>

						</div>

					</div>

				</div>

			</FormGroup>

			<FormGroup>
				<Col md={6}>
				{save &&
					<ButtonGroup>
						<Button color="primary" onClick={onSave}>{'Enregistrer'}</Button>
					</ButtonGroup>

				}
				</Col>
				<Col md={6} />
			</FormGroup>

			<p className={'cs-tooltip'} id={'tooltip'} />

		</React.Fragment>

	);

}

export default CsTable
