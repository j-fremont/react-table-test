
import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CsTreeTable } from './CsTreeTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync, faReply, faEraser, faClipboardList } from '@fortawesome/free-solid-svg-icons'

import { renderTextCell, renderInputCell, renderSelectCell, renderIconCell } from './CsTreeTableCell';

const CsTreeTableContainer = () => {

	const options = [{
		name: 'option 1'
	},{
		name: 'option 2'
	},{
		name: 'option 3'
	}]

	const data = useMemo(() => [
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

	], []);


	const columns = useMemo(() => [
		{
			basis: '10px',
			renderCell: row => {
				return renderIconCell(row, faSync, () => { console.log('click on button') })
			},




		},{
			name: 'col1',
			basis: '100px',
			renderCell: row => {
				return renderTextCell(row, 'col1')
			},
			searchable: true,



		},{
			name: 'col2',
			basis: '100px',
			renderCell: row => {
				return renderInputCell(row, 'col2')
			},



		},{
			name: 'col3',
			basis: '100px',
			renderCell: row => {
				return renderSelectCell(row, 'col3', options)
			},



		},{
			name: 'col4',
			basis: '100px',
			renderCell: row => {
				return renderTextCell(row, 'col4')
			},
			searchable: true,



		}

	], []);

	const saveTable = (data) => {


		console.log(data);


	}


	return (
		<Container fluid={true}>
			<Row>
				<Col md={6}>

					<CsTreeTable height={600} data={data} columns={columns} replace={true} offset={true} save={saveTable} />

				</Col>
				<Col md={6} />
			</Row>
		</Container>
	)
}

export default CsTreeTableContainer
