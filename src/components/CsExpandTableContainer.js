
import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CsExpandTable } from './CsExpandTable'
import { CsTreeCell, CsTreeHeader, CsEditCell, CsIconCell, CsSelectCell } from './CsExpandTableCell';

import makeData from './makeSubRowsDataFromElectrotech'

const CsExpandTableContainer = () => {

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

					<CsExpandTable data={data} columns={columns} setData={setData} />

				</Col>
				<Col md={6} />
			</Row>
		</Container>
	)
}

export default CsExpandTableContainer
