
import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CsTable } from './CsTable'
import { faEraser, faReply } from '@fortawesome/free-solid-svg-icons'

const CsTableContainer = () => {

	const clickRemove = () => {

		console.log('clickRemove')

	}

	const columns = [/*{
		field: 'col0',
		basis: '50px',

	},{
		basis: '50px',
		faStyle: faTrash,
		onClick: click,

	},*/{
		name: 'Technology tag',
		field: 'col1',
		basis: '1200px',
		resizable: true,

	},{
		name: 'Technology description',
		field: 'col2',
		basis: '1200px',
		resizable: true,
		//editable: true,

	},{
		name: 'Chosen mapping',
		field: 'col3',
		basis: '1200px',
		resizable: true,

	},{
		basis: '50px',
		faStyle: faEraser,
		onClick: clickRemove,
		//onClickHeader: clickRemoveHeader,

	},{
		basis: '50px',
		faStyle: faReply,
		onClick: clickRemove,
		//onClickHeader: clickRemoveHeader,

	},{
		name: 'Previous mapping',
		field: 'col4',
		basis: '1200px',
		resizable: true,

	}/*,{
		basis: '50px',
		faStyle: faClipboardList,
		onClick: clickHistory,

	}*/];

	const [data, setData] = useState([{
		col1: 'Lorem Ipsum',
		col2: [
			'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
			'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
			'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
			'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
		],
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


	const add = () => {

	}

	const save = (rows) => {

		console.log(rows);


		/*setData(data.map(d => ({
			...d,
			col1: 'Coucou'
		})));*/

	}

	const applyOffset = () => {

		console.log('offset');

	}

	const options = {
		add: {
			action: add,
			label: 'Add tag',
		},
		update: {
			action: add,
			label: 'Update tag',
		},
		remove: {
			action: add,
			label: 'Remove tag',
		},
		search: {

		},
		filter: {

		},
		selection: {

		},
		offset: {
			action: applyOffset,

		},
		save: {
			action: save,
			label: 'Save',
		},
		align: {

		},
		tooltip: {

		},


	}


	return (
		<Container fluid={true}>
			<Row>
				<Col md={9}>
					<CsTable height={200} data={data} columns={columns} options={options} />
				</Col>
				<Col md={3} />
			</Row>
		</Container>
	)
}

export default CsTableContainer
