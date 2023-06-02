
import React, { useState, useEffect } from 'react';
import { Col, FormGroup, FormText, ButtonGroup, Button, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSync, faAlignLeft, faAlignRight, faQuestion, faFilter, faColumns } from '@fortawesome/free-solid-svg-icons'
import CsSwitch from './CsSwitch'

import '../cs-table.css';

// Cpmponent table qui doit permettre les fonctions suivantes.
// - Le redimensionnsment des colonnes.
// - La sélection d'une ligne (marquer et identifier la ligbne sélectionnée).
// - L'alignement des textes (justifié à gauche ou à droite) dans les cellules.
// - Le tri des lignes en focntion d'un texte.
// - Le filtre des lignes en fonction d'une expression régulière.
// - La sélection des colonnes à afficher.
// - Les cellules multi-lignes.
//
// A faire.
// - L'affichage d'un arbre.
// - La mise à jour des données.
// - La colorisation des lignes.
//
// Des librairies de gestion des tables proposent souvent quelques unes de ces fonctions mais pas trouvé de librairie qui les propose toutes. Donc développement from scratch.
//
export const CsTable = ({ height, data = [], columns = [], options={} }) => {

	const [align, setAlign] = useState('left');
	const [openSelection, setOpenSelection] = useState(false);
	const [activeTooltip, setActiveTooltip] = useState(true);

	const [rows, setRows] = useState([]);

	const [sortedField, setSortedField] = useState(''); // Nom du champ (colonne) en cours de tri..
	const [filterText, setFilterText] = useState(''); // Expression régulière pour le filtre.
	const [searchText, setSearchText] = useState(''); // Texte pour la recherche.
	const [searchPositions, setSearchPositions] = useState([]); // liste des positions dans lesquelles le texte est trouvé. Une position = un nom de colonne (key + un index de ligne (pos).
	const [shiftPositions, setShiftPositions] = useState([]); // Liste des positions pas encore parcourues.
	const [currentPosition, setCurrentPosition] = useState({}); // Position courante.
	const [offset, setOffset] = useState(0); // Valeur de l'offset.
	const [selectedColumns, setSelectedColumns] = useState([]); // Nom des colonnnes sélectionnées pour l'affichage.

	useEffect(() => {
		// Ajout des effets pour le resizing des colonnes.
		document.addEventListener('mousemove', mouseMove);
		document.addEventListener('mouseup', mouseUp);
		// Initialisation des className pour la sélection d'une ligne.
		initializeOnClickOnTableRows();
	});

	useEffect(() => {
		setSelectedColumns(columns.filter(c => c.field).map(c => c.field));
	}, [columns]);

	useEffect(() => {
		setRows(data.map(d => d));
	}, [data]);

	// Fonctions pour le resizing des colonnes
	//
	let currentHeader, nextHeader, currentHeaderWidth, nextHeaderWidth, currentCells=[], nextCells=[], pageX;

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

	// Fonctions pour le tooltip
	//
	// mouseOver : activation du tooltip.
	// mouseOut : désactivation du tooltip.
	//
	const toggleActiveTooltip = () => {
		setActiveTooltip(!activeTooltip);
	}

	const mouseOver = (e, innerHTML) => {
		if (activeTooltip && innerHTML) {
			const tooltip = document.getElementById('tooltip');
			const x = e.clientX, y = e.clientY;
			tooltip.style.top = (y + 10) + 'px';
			tooltip.style.left = (x) + 'px';
			tooltip.style.display = 'block';
			tooltip.innerHTML = innerHTML;
		}
	}

	const mouseOut = (e) => {
		const tooltip = document.getElementById('tooltip');
		tooltip.style.display = 'none';
	}

	// Fonctions pour la sélection d'une ligne
	//
	// initializeOnClickOnTableRows : initialise le onClick sur toutes les lignes.
	// unclickAllTableRows : désactive la sélection sur toutes les lignes.
	// onClickOnTableRow : active la sélection d'une ligne.$
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
			selectedRow.className = 'cs-table-row';
		}
	}

	const onClickOnTableRow = (e) => {
		unclickAllTableRows();
		e.currentTarget.className = 'cs-table-row-selected';
	}

	// Fonctions pour le filtrage
	//
	// onChangeFilterText : changement de l'expression régulière.
	// onFilter : application de l'expression régulière à toutes les colonnes de toutes les lignes.
	//
	// Stocke la fonction de filtrage dans le state pour l'utiliser dans d'autres fonctions (tri...).
	//
	const onChangeFilterText = (e) => {
		setFilterText(e.target.value);
	}

	const onFilter = () => {
		const regex = new RegExp(filterText);
		setRows(data.filter(d => columns.some(c => c.field && regex.test(d[c.field]))));
	}

	// Fonctions pour le tri
	//
	// onSort : application du tri sur la colonne.
	//
	// Une seule colonne en cours de tri en même tremps.
	//
	const onSort = (e) => {
		const field = e.target.attributes.getNamedItem('field').value;
		if (sortedField && field===sortedField) { // Annulation du tri sur la colonne en cours de tri uniquement.
			onFilter();
			setSortedField('');
			e.currentTarget.className = 'cs-table-header-cell';
		} else if (!sortedField) { // Activation du tri si pas d'autre colonne en cours de tri.
			setSortedField(field);
			setRows(rows.sort(compare(field)).map(d => d));
			e.currentTarget.className = 'cs-table-header-cell-sorted';
		}
	}

	const compare = (f) => {
		return function(a, b) {
			if (a[f] < b[f]) return -1;
			if (a[f] > b[f]) return 1;
			return 0;
		}
	}

	// Fonctions pour la recherche de texte
	//
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
				// Retoune un array de { key, pos }.
				// key : property de l'objet où à été trouvé le texte.
				// pos : index de l'array où à été trouvé le texte.
				const positions = rows.reduce((acc, val, idx) => {
					acc.push(...Object.keys(val).filter(k => searchFilter(val[k])).map(k => ({ key: k, pos: idx })));
					return acc;
				}, []);
				setSearchPositions(positions);
				setShiftPositions([...positions]);
			}
		}
	}

	const searchFilter = (field) => {
		if (Array.isArray(field)) {
			return field.some(f => f.includes(searchText));

		} else {
			return field.includes(searchText);
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
			return (numberOfSearch-numberOfShift) + ' / ' + numberOfSearch;
		}
	}

	// Fonctions pour la sélection des colonnes
	//
	const toggleSelection = () => {
		setOpenSelection(!openSelection);
	}

	const toggleSelectedColumn = (field) => {
		if (selectedColumns.includes(field)) {
			setSelectedColumns(selectedColumns.filter(c => c!==field));
		} else {
			setSelectedColumns(selectedColumns.concat(field));
		}
	}

	// Fonctions pour l'offset.
	//
	const onChangeOffset = (event) => {
		setOffset(event.target.value);
	}

	const onApplyOffset = () => {

		options.offset.action(offset);
	}

	// Fonctions pour la souvegarde.
	//
	const onSave = () => {

		options.save.action(rows);

	}

	// Fonctions pour l'alignement
	//
	const onAlignLeft = () => {
		setAlign('left');
		document.documentElement.style.setProperty('--cell-text-align', 'left');
		document.documentElement.style.setProperty('--cell-direction', 'rtl');
	}

	const onAlignRight = () => {
		setAlign('right');
		document.documentElement.style.setProperty('--cell-text-align', 'right');
		document.documentElement.style.setProperty('--cell-direction', 'ltr');
	}

	// Fonctions pour la mise à jour
	//
	const changeCell = (e, index, field) => {
		setRows(rows.map((r, i) => {
			return i===index ? {
				...r,
				[field]: e.target.value
			} : r;
		}))
	}

	// Fonctions pour les cellules multi-lignes
	//
	const printField = (field) => {
		if (Array.isArray(field)) {
			return (
				<div>
					{field.map(f => <p class='cs-table-cell' style={{ marginBottom: '0px' }}>{f}</p>)}
				</div>
			)
		} else {
			return field;
		}
	}

	// Appeler '--nb-line': numberOfLinesInRowFields(row); dans le style.
	//
	const numberOfLinesInRowFields = (row) => {
		return columns.filter(column => selectedColumns.includes(column.field)).reduce((max, c) => {
			if (row[c.field] && Array.isArray(row[c.field])) {
				const length = row[c.field].length;
				if (length>max) max=length;
			}
			return max;
		}, 1);
	}

	// Appeler '--row-height': rowHeight(row); dans le style.
	//
	const rowHeight = (row) => {
		const numberOfLinesInRow = columns.filter(column => selectedColumns.includes(column.field)).reduce((max, c) => {
			if (row[c.field] && Array.isArray(row[c.field])) {
				const length = row[c.field].length;
				if (length>max) max=length;
			}
			return max;
		}, 1);
		return numberOfLinesInRow===1 ? '26px' : (numberOfLinesInRow * 22) + 'px';
	}

	return (

		<React.Fragment>

			<ButtonGroup style={{ marginTop: '10px', marginBottom: '10px' }} row>
				{options.add && <Button size={'sm'} color={'primary'} onClick={options.add.action}>{options.add.label}</Button>}
				{options.update && <Button size={'sm'} color={'primary'} onClick={options.update.action}>{options.update.label}</Button>}
				{options.remove && <Button size={'sm'} color={'primary'} onClick={options.remove.action}>{options.remove.label}</Button>}
				{(options.add || options.update || options.remove) && <div style={{ marginRight: '10px' }}/>}
				{options.search &&
					<React.Fragment>
						<Input
							bsSize={'sm'}
							style={{ width: '250px' }}
							placeholder={'Search...'}
							value={searchText || ''}
							onChange={onChangeSearchText} />
						<Button color='light' style={{ marginRight: '10px' }} onClick={onSearch}><FontAwesomeIcon icon={faSearch} /></Button>
						{searchOccurenceText() && <FormText color='muted' style={{ width: '100px', marginTop: '10px' }}>{searchOccurenceText()}</FormText>}
					</React.Fragment>
				}
				{options.filter &&
					<React.Fragment>
						<Input
							bsSize={'sm'}
							style={{ width: '250px' }}
							placeholder={'Filter...'}
							value={filterText || ''}
							onChange={onChangeFilterText} />
						<Button color='light' style={{ marginRight: '10px' }} onClick={onFilter}><FontAwesomeIcon icon={faFilter} /></Button>
					</React.Fragment>
				}
				{options.selection &&
					<Button color={'primary'} style={{ marginRight: '10px' }} onClick={toggleSelection}><FontAwesomeIcon icon={faColumns} /></Button>
				}
				{options.offset &&
					<React.Fragment>
						<Input
							type='number'
							bsSize={'sm'}
							style={{ width:'100px' }}
							placeholder={'Offset...'}
							value={offset || ''}
							onChange={onChangeOffset} />
						<Button color='light' style={{ marginRight: '10px' }} onClick={onApplyOffset} ><FontAwesomeIcon icon={faSync} /></Button>
					</React.Fragment>
				}
				{options.tooltip &&
					<Button color={activeTooltip ? 'primary' : 'light'} style={{ marginRight: '10px' }} onClick={toggleActiveTooltip}><FontAwesomeIcon icon={faQuestion} /></Button>
				}
				{options.align &&
					<React.Fragment>
						<Button color={align==='left' ? 'primary' : 'light'} onClick={onAlignLeft}><FontAwesomeIcon icon={faAlignLeft} /></Button>
						<Button color={align==='right' ? 'primary' : 'light'} onClick={onAlignRight}><FontAwesomeIcon icon={faAlignRight} /></Button>
					</React.Fragment>
				}
			</ButtonGroup>

			<FormGroup>

				<div className='cs-table' id='tableId'>

					<div className='cs-table-header'>

							{columns.filter(column => selectedColumns.includes(column.field)).map(column => (
								column.onClickHeader ?
									<div key={column.field} className='cs-table-header-button' onClick={column.onClick}><FontAwesomeIcon icon={column.faStyle} /></div>
									:
									<div key={column.field} className='cs-table-header-cell' onClick={column.field && onSort} field={column.field} style={{ flexBasis: column.basis }}>
										{column.name}
										{column.resizable && <div className='cs-resizer' onClick={e => e.stopPropagation()} onMouseDown={mouseDown} />}
									</div>
							))}

					</div>

					<div className='cs-table-viewport' style={{ height: height + 'px' }}>

						<div className='cs-table-rows'>

							<div className='cs-table-mover'>

								{rows.map((row, pos) => {

									return (
										<div className='cs-table-row' style={{ '--row-height': rowHeight(row) }}>
											{columns.filter(column => selectedColumns.includes(column.field)).map(column => (
												column.onClick ?
													<div className='cs-table-cell-button' onClick={column.onClick}><FontAwesomeIcon size='xs' icon={column.faStyle} /></div>
													: (column.editable ?
														<div field={column.field} style={{ flexBasis: column.basis }}>
															<input className='cs-table-cell-input' value={row[column.field]} onChange={(e) => changeCell(e, pos, column.field)}/>
														</div>
														:
														<div className={cellClassName(pos, column)} field={column.field} style={{ flexBasis: column.basis }} onMouseOver={(e) => mouseOver(e, row[column.field])} onMouseOut={mouseOut}>
															{printField(row[column.field])}
														</div>
													)
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
					{options.save &&
						<ButtonGroup>
							<Button color='primary' onClick={onSave}>{options.save.label}</Button>
						</ButtonGroup>
					}
				</Col>
				<Col md={6} />
			</FormGroup>

			<p className={'cs-tooltip'} id={'tooltip'} />

			<Modal isOpen={openSelection}>
				<ModalHeader toggle={toggleSelection}>{'Show columns'}</ModalHeader>
				<ModalBody>
					<FormGroup>
					{columns.filter(c => c.field).map(c => (
						<CsSwitch id={c.field} label={c.name} checked={selectedColumns.includes(c.field)} onChange={() => toggleSelectedColumn(c.field)} />
					))}
					</FormGroup>
				</ModalBody>
			</Modal>

		</React.Fragment>

	);

}

export default CsTable
