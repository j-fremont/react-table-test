
import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CsPageTable } from './CsPageTable'

import makeData from './makeDataFromMappings'

const CsPageTableContainer = () => {

	const [data, setData] = useState(() => makeData());

	const columns = useMemo(() => [
		{
			Header: 'Nom',
			accessor: 'name', // accessor is the "key" in the data
			width: 100,

		},
		{
			Header: 'Description',
			accessor: 'description', // accessor is the "key" in the data
			width: 100,

		},
	], []);


	return (
		<Container fluid={true}>
			<Row>
				<Col md={6}>

					<CsPageTable data={data} columns={columns} setData={setData} />

				</Col>
				<Col md={6} />
			</Row>
		</Container>
	)
}

export default CsPageTableContainer
