
import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CsTable } from './CsTable'
//import CsTreeTable2 from './CsTreeTable2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync, faReply, faEraser, faClipboardList } from '@fortawesome/free-solid-svg-icons'

import { renderTextCell, renderTreeTextCell, renderInputCell, renderSelectCell, renderIconCell, renderCheckboxCell } from './CsTreeTableCell';

import makeData from './makeTreeDataFromIed'

const CsTreeTableContainer = () => {

	const options = [{
		name: 'option 1'
	},{
		name: 'option 2'
	},{
		name: 'option 3'
	}]

	/*const data = useMemo(() => [
		{
			data: {
				id: '_1',
				col1: 'hello a',
				col2: 'world a',
				col3: 'option 1',
				col4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

			},
			children: []

		},{
			data: {
				id: '_2',
				col1: 'hello b',
				col2: 'world b',
				col3: 'option 2',
				col4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

			},
			children: []

		},{
			data: {
				id: '_3',
				col1: 'hello zzzzz',
				col2: 'world c',
				col3: 'option 3',
				col4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

			},
			children: []

		},

	], */

	const data = makeData();



	const columns = useMemo(() => [
		{
			basis: '10px',
			renderCell: row => {
				return renderIconCell(row, faSync, () => { console.log('click on button') })
			},




		},{
			name: 'activated',
			basis: '10px',
			renderCell: row => {
				return renderCheckboxCell(row, 'activated')
			},




		},{
			label: 'Nom',
			name: 'name',
			basis: '100px',
			renderCell: (row, tabledata) => {
				return renderTreeTextCell(row, 'name', tabledata)
			},
			searchable: true,
			duplicable: false,



		},{
			label: 'Préfixe',
			name: 'prefix',
			basis: '100px',
			renderCell: (row, tabledata) => {
				return renderInputCell(row, 'prefix', tabledata)
			},
			searchable: true,



		},{
			label: 'Instance',
			name: 'lnInst',
			basis: '100px',
			renderCell: (row, tabledata) => {
				return renderInputCell(row, 'lnInst', tabledata)
			},
			searchable: true,




		},/*{
			label: 'Colonne 3',
			name: 'col3',
			basis: '100px',
			renderCell: row => {
				return renderSelectCell(row, 'col3', options)
			},



		},*/{
			label: 'Note UML',
			name: 'test',
			basis: '100px',
			renderCell: (row, tabledata) => {
				return renderTextCell(row, 'test', tabledata)
			},
			//searchable: true,
			duplicable: false,




		}

	], []);

	const saveTable = (data) => {


		console.log(data);


	}


	return (
		<Container fluid={true}>
			<Row>
				<Col md={6}>

					<CsTable height={310} data={data} columns={columns} replace={true} offset={true} save={saveTable} />

				</Col>
				<Col md={6} />
			</Row>
		</Container>
	)
}

export default CsTreeTableContainer
