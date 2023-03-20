
import React, { useMemo } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CsTreeTable } from './CsTreeTable'
import { CsTreeCell, CsTreeHeader, CsEditCell, CsIconCell, CsSelectCell } from './CsTreeTableCell';

const CsTableContainer = () => {

	const options = [{key:1, value:'Option un'},{key:2, value:'Option deux'},{key:3, value:'Option trois'}];


	const columns = useMemo(() => [
		{
			id: 'expander',
			Header: CsTreeHeader,
			accessor: 'col3', // accessor is the "key" in the data
			Cell: CsTreeCell,
			width: 50,


		},
		{
			Header: '',
			accessor: 'col0', // accessor is the "key" in the data
			Cell: CsIconCell,
			width: 5,



		},{
			Header: 'Column 1',
			accessor: 'col1', // accessor is the "key" in the data
			Cell: CsEditCell,
			width: 25,


		},{
			Header: 'Column 2',
			accessor: 'col2',
			Cell: (props) => CsSelectCell({...props, options}),
			width: 20,


		},
	], []);





	return (
		<Container fluid={true}>
			<Row>
				<Col md={6}>

					<CsTreeTable columns={columns} offset={true} />

				</Col>
				<Col md={6} />
			</Row>
		</Container>
	)
}

export default CsTableContainer
