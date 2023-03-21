
import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CsTreeTable } from './CsTreeTable'
import { CsTreeCell, CsTreeHeader, CsEditCell, CsIconCell, CsSelectCell } from './CsTreeTableCell';

import makeData from './makeData_1'

const CsTableOneContainer = () => {

	const [data, setData] = useState(() => makeData());

	const columns = useMemo(() => [
		{
			Header: 'Prefixe',
			accessor: 'prefix', // accessor is the "key" in the data
			Cell: CsEditCell,
			width: 15,

		},{
			Header: 'Instance',
			accessor: 'lnInst', // accessor is the "key" in the data
			Cell: CsEditCell,
			width: 15,

		},{
			Header: 'Nouveau nom',
			accessor: 'name', // accessor is the "key" in the data
			Cell: CsEditCell,
			width: 20,

		},{
			id: 'expander',
			Header: CsTreeHeader,
			accessor: 'name', // accessor is the "key" in the data
			Cell: CsTreeCell,
			width: 25,

		},{
			Header: 'Note UML',
			accessor: 'description', // accessor is the "key" in the data
			width: 25,

		},
	], []);








	return (
		<Container fluid={true}>
			<Row>
				<Col md={6}>

					<CsTreeTable data={data} columns={columns} offset={true} setData={setData} />

				</Col>
				<Col md={6} />
			</Row>
		</Container>
	)
}

export default CsTableOneContainer
