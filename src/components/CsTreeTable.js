
import React, { useState, useEffect, useMemo, useRef, createRef } from 'react';
import { Col, Table, FormGroup, ButtonGroup, Button, Input, Pagination, PaginationItem, PaginationLink, UncontrolledTooltip } from 'reactstrap';
import { TreeTable, TreeState } from 'cp-react-tree-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faSearch, faSync } from '@fortawesome/free-solid-svg-icons'



import '../tree-table.css';
import '../tree-table-ecs.css';

export const CsTreeTable = ({ height, data = [], columns = [], replace = false, offset = false, save = undefined }) => {

	const ref = createRef();

	const [value, setValue] = useState();

	const [searchText, setSearchText] = useState(''); // Texte recherché.
	const [searchPositions, setSearchPositions] = useState([]); // Liste des { top: $state.top, column } des rows dans lesquelles le texte est trouvé.
	const [searchPosition, setSearchPosition] = useState(); // Position courante consultée dans searchPositions.
	const [searchIndex, setSearchIndex] = useState();

	const [duplicatePositions, setDuplicatePositions] = useState([]); // Liste des { top: $state.top, column } des rows dans lesquelles le texte est dupliqué.



	const [replaceText, setReplaceText] = useState('');

	const [offsetValue, setOffsetValue] = useState();


	const [message, setMessage] = useState();
	const [spinner, setSpinner] = useState(false);



	useEffect(() => {

		//setValue(TreeState.createEmpty());



		initializeOnClickOnTableRows();

	});

	useEffect(() => {

		//console.log(TreeState.create(data));


		setValue(TreeState.create(data));












	}, [data]);

	const initializeOnClickOnTableRows = () => {
		const treeTableRows = document.getElementsByClassName('cp_tree-table_row');
		for (const treeTableRow of treeTableRows) {
			treeTableRow.onclick = (e) => { onClickOnTableRow(e) };
		}
	}

	const onClickOnTableRow = (e) => {
		const selectedRows = document.getElementsByClassName('ecs_tree-table_selected-row');
		for (const selectedRow of selectedRows) {
			selectedRow.classList.remove('ecs_tree-table_selected-row');
		}
		e.currentTarget.className = "ecs_tree-table_selected-row";
	}

	const searchTextInFieldsOfTree = (text) => {
		return value.data.map(d => ({
			top: d.$state.top,
			columnsWithText : columns.filter(c => c.searchable).map(c => c.name).filter(f => d.data[f] && d.data[f].includes(text))
		})).reduce((acc, e) => {
			e.columnsWithText.forEach(c => {
				acc.push({
					top: e.top,
					column: c
				});
			});
			return acc;
		}, []);
	}

	// Retourne le nombre d'occurences dans une array, sous forme d'objet.
	// {
	//  occurence_1: nombre,
	//  occurence_2: nombre
	// }
	//
	const occurences = (arr) => {
		return arr.reduce((acc, val) => {
			if (acc[val]) {
				acc[val]++;
			} else {
				acc[val]=1;
			}
			return acc;
		}, {});
	}

	// Retourne les occurences multiples dans une array, sous forme d'array.
	//
	const multipleOccurences = (arr) => {
		const occ = occurences(arr);
		return Object.keys(occ).filter(k => occ[k] > 1);
	}

	const searchDuplicateTextInFieldsOfTree = () => {

		return columns.filter(c => c.duplicable===false).map(c => c.name).flatMap(n => {

			const duplicates = multipleOccurences(value.data.filter(d => d.data.name).map(d => d.data[n]));

			if (duplicates.length) {

				return value.data.reduce((acc, d) => {
					if (duplicates.includes(d.data[n])) {
						acc.push({
							top: d.$state.top,
							column: n
						});
					}
					return acc;
				}, []);

			} else return [];

		});

	}

	const scrollTo = (top) => {
		if (ref.current!=null) {
			ref.current.scrollTo(top);
		}
	}







	const onExpand = () => {
		if (value && value.hasData) {
			setValue(TreeState.expandAll(value));
		}
	}

	const onCollapse = () => {
		if (value && value.hasData) {
			setValue(TreeState.collapseAll(value));
		}
	}

	const onSearch = () => {

		if (!searchText) {
			//setSearchOccurence(undefined);
			setSearchPositions([]);

		} else if (value && value.hasData) {

			if (searchPositions.length) {

				const position = searchPositions.shift();
				setSearchPosition(position);
				scrollTo(position.top);







			} else {

				const newSearchPositions = searchTextInFieldsOfTree(searchText);
				setSearchPositions(newSearchPositions);


			}








		}






	}

	const onOffset = () => {


	}

	const onReplace = () => {


	}

	const onSave = () => {

		save(value);

		const newDuplicatePositions = searchDuplicateTextInFieldsOfTree();
		setDuplicatePositions(newDuplicatePositions);

	}


	return (

		<React.Fragment>

			<FormGroup style={{marginTop: '10px'}} row>
				<Col md={6}>
					<ButtonGroup>
						<Button onClick={onExpand} color="light"><FontAwesomeIcon icon={faExpand} /></Button>
						<Button onClick={onCollapse} color="light"><FontAwesomeIcon icon={faCompress} /></Button>
						<Input
							bsSize={'sm'}
							style={{marginRight: '10px', marginLeft: '10px'}}
							placeholder={'Search...'}
							value={searchText || ''}
							onChange={e => {
								setSearchText(e.target.value);
								//setSearchOccurence(undefined);
								setSearchPositions([]);


							}} />
						<Button color="light" style={{marginRight: '10px'}} onClick={onSearch}><FontAwesomeIcon icon={faSearch} /></Button>
						{replace &&
							<React.Fragment>
								<Input
									bsSize={'sm'}
									style={{marginRight: '10px'}}
									placeholder={'Replace...'}
									value={replaceText || ''}
									onChange={e => {
										setReplaceText(e.target.value);


									}} />
								<Button color="light" style={{marginRight: '10px'}} onClick={onReplace}><FontAwesomeIcon icon={faSync} /></Button>
							</React.Fragment>
						}
						{offset &&
							<React.Fragment>
								<Input
									bsSize={'sm'}
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
				<TreeTable
					height={height}
					value={value || {}}
					onChange={setValue}
					onScroll={(n) => {
						//console.log(n);

						scrollTo(n);



					}}
					ref={ref}>
					{columns.map(c => (
						<TreeTable.Column
							basis={c.basis}
							renderCell={row => c.renderCell(row, {
								searchPosition,
								searchPositions,
								duplicatePositions,


							})}
							renderHeaderCell={() => c.label} />


						))}
				</TreeTable>
				<p className={'ecs-tooltip'} id={'tooltip'} />
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
		</React.Fragment>


	)

}

export default CsTreeTable
