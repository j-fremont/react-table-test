
import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CsTable } from './CsTable'
import { faSync } from '@fortawesome/free-solid-svg-icons'


const CsTableContainer = () => {

	const click = () => {

		console.log('click')

	}

	const columns = [{
		type: 'button',
		basis: '10px',
		style: faSync,
		onClick: click

	},{
		type: 'text',
		name: 'Colonne 1',
		field: 'col1',
		basis: '1200px',

	},{
		type: 'button',
		basis: '10px',
		style: faSync,
		onClick: click

	},{
		type: 'text',
		name: 'Colonne 2',
		field: 'col2',
		basis: '1200px',

	}];

	const [data, setData] = useState([{
		col1: 'Lorem ipsum',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Dolor sit amet',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Consectetur adipiscing elit',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Sed do eiusmod tempor',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Incididunt ut labore',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Et dolore magna aliqua.',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Ut enim ad minim veniam',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Quis nostrud',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Exercitation ullamco laboris',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'nisi ut aliquip',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Ex ea commodo consequat',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Et dolore magna aliqua.',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Ut enim ad minim veniam',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Quis nostrud',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	},{
		col1: 'Exercitation ullamco laboris',
		col2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
	}]);

	const options = {
		add: true,
		search: true,
		offset: true,


	}

	const save = () => {

		console.log('save');


		setData(data.map(d => ({
			...d,
			col1: 'Coucou'
		})));

	}

	const applyOffset = () => {

		console.log('offset');

	}

	return (
		<Container fluid={true}>
			<Row>
				<Col md={6}>
					<CsTable height={200} data={data} columns={columns} options={options} save={save} applyOffset={applyOffset} />
				</Col>
				<Col md={6} />
			</Row>
		</Container>
	)
}

export default CsTableContainer
