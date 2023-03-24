
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Col, Table, FormGroup, ButtonGroup, Button, Input, Pagination, PaginationItem, PaginationLink, UncontrolledTooltip } from 'reactstrap';
import { TreeTable, TreeState } from 'cp-react-tree-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faSearch, faSync } from '@fortawesome/free-solid-svg-icons'



import '../tree-table.css';
import '../tree-table-ecs.css';

export const CsTreeTable = ({ height, data = [], columns = [], replace = false, offset = false, save = undefined }) => {

	const [value, setValue] = useState();

	const [searchText, setSearchText] = useState(''); // Texte recherché.
	const [searchOccurence, setSearchOccurence] = useState(); // Nombre d'occurences du texte recherché.
	const [searchPositions, setSearchPositions] = useState([]); // Liste des $state.top des rows dans lesquelles le texte est trouvé.
	const [searchPosition, setSearchPosition] = useState(); // Position courante consultée dans searchPositions.

	const [searchIndex, setSearchIndex] = useState();



	const [replaceText, setReplaceText] = useState('');

	const [offsetValue, setOffsetValue] = useState();

	const [warningPositions, setWarningPositions] = useState([]);

	const [message, setMessage] = useState();
	const [spinner, setSpinner] = useState(false);

	const ref = useRef(null);

	useEffect(() => {

		initializeOnClickOnTableRows();

	});

	useEffect(() => {

		console.log(TreeState.create(data));


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

	const searchIndexOfTextInFieldsOfTreeState = (text) => {
		return value.data.filter(d => {
			return columns.filter(c => c.searchable).map(c => c.name).some(f => d.data[f] && d.data[f].includes(text)); // Filtre les datas dont l'un des champs de recherche contient le texte à trouver.
		}).map(d => d.$state.top);
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
			setSearchOccurence(undefined);
			setSearchPositions([]);

		} else if (value && value.hasData) {

			console.log(searchIndexOfTextInFieldsOfTreeState(searchText));





		}






	}

	const onOffset = () => {


	}

	const onReplace = () => {


	}

	const onSave = () => {

		save(value);

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
								setSearchOccurence(undefined);
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
					ref={ref}>
					{columns.map(c => (
						<TreeTable.Column
							basis={c.basis}
							renderCell={c.renderCell}
							renderHeaderCell={() => c.name} />


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
