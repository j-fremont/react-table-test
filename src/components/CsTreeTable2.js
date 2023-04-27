
import React, { useState, useEffect, useMemo, useRef, createRef } from 'react';
import { Col, Table, FormGroup, ButtonGroup, Button, Input, Pagination, PaginationItem, PaginationLink, UncontrolledTooltip } from 'reactstrap';
import { TreeTable, TreeState } from 'cp-react-tree-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faSearch, faSync } from '@fortawesome/free-solid-svg-icons'


import '../tree-table.css';
import '../tree-table-ecs.css';

const MOCK_DATA = genData();


export default class CsTreeTable2 extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

			treeValue: TreeState.create(MOCK_DATA),

			searchPosition: undefined,
			searchPositions: [],
			duplicatePositions: [],

		};

	}

	render() {

    const { treeValue } = this.state;

		return (
			<React.Fragment>
				<div className="controls">
					<button onClick={this.handleOnExpandAll}>Expand all</button>
					<button onClick={this.handleOnCollapseAll}>Collapse all</button>
				</div>

				<TreeTable
					value={treeValue}
					onChange={this.handleOnChange}>

					<TreeTable.Column
            renderCell={this.renderIndexCell}
            renderHeaderCell={() => <span>Name</span>}/>
          <TreeTable.Column
            renderCell={this.renderEditableCell}
            renderHeaderCell={() => <span>Contact person</span>}/>
          <TreeTable.Column
            renderCell={this.renderEmployeesCell}
            renderHeaderCell={() => <span className="t-right">Employees</span>}/>
          <TreeTable.Column
            renderCell={this.renderExpensesCell}
            renderHeaderCell={() => <span className="t-right">Expenses ($)</span>}/>



				</TreeTable>

				<p className={'ecs-tooltip'} id={'tooltip'} />

			</React.Fragment>
		);
	}

	/*
	{this.props.columns.map(c => (
		<TreeTable.Column
			basis={c.basis}
			renderCell={row => c.renderCell(row, {
				searchPosition: this.state.searchPosition,
				searchPositions: this.state.searchPositions,
				duplicatePositions: this.state.duplicatePositions,


			})}
			renderHeaderCell={() => c.label} />


		))}
		*/

	handleOnChange = (newValue) => {
    this.setState({ treeValue: newValue });
  }


  handleOnExpandAll = () => {
    this.setState((state) => {
      return {
        treeValue: TreeState.expandAll(state.treeValue),
      };
    });
  }

  handleOnCollapseAll = () => {
    this.setState((state) => {
      return {
        treeValue: TreeState.collapseAll(state.treeValue)
      };
    });
  }

	renderIndexCell = (row) => {
	    return (
	      <div style={{ paddingLeft: (row.metadata.depth * 15) + 'px'}}
	        className={row.metadata.hasChildren ? 'with-children' : 'without-children'}>

	        {(row.metadata.hasChildren)
	          ? (
	              <button className="toggle-button" onClick={row.toggleChildren}></button>
	            )
	          : ''
	        }

	        <span>{row.data.name}</span>
	      </div>
	    );
	  }

	  renderEmployeesCell = (row) => {
	    return (
	      <span className="employees-cell">{row.data.employees}</span>
	    );
	  }

	  renderExpensesCell = (row) => {
	    return (
	      <span className="expenses-cell">{row.data.expenses}</span>
	    );
	  }

	  renderEditableCell = (row) => {
	    return (
	      <input type="text" value={row.data.contact}
	        onChange={(event) => {
	          row.updateData({
	            ...row.data,
	            contact: event.target.value,
	          });
	        }}/>
	    );
	  }
	}

	function genData() {
		//return [];


		return [
	    {
	      data: { name: 'Company A', expenses: '60,000', employees: '5', contact: undefined },
	      height: 32,
	    },
	    {
	      data: { name: 'Company I', expenses: '105,000', employees: '22', contact: undefined },
	      children: [
	        {
	          data: { name: 'Department 1', expenses: '75,000', employees: '18', contact: 'Florence Carter' },
	          children: [
	            {
	              data: { name: 'Group alpha', expenses: '25,000', employees: '8', contact: 'Doug Moss' },
	            },
	            {
	              data: { name: 'Group beta', expenses: '10,000', employees: '6', contact: 'Camila Devonport' },
	            },
	            {
	              data: { name: 'Group gamma', expenses: '40,000', employees: '4', contact: 'Violet Curtis' },
	            }
	          ],
	        },
	        {
	          data: { name: 'Department 2', expenses: '30,000', employees: '4', contact: 'Selena Rycroft' },
	          height: 32,
	        }
	      ],
	    },
	    {
	      data: { name: 'Company B', expenses: '70,000', employees: '5', contact: 'Dani Hopkinson' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company C', expenses: '50,000', employees: '4', contact: 'Jacob Ellery' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company D', expenses: '230,000', employees: '9', contact: 'Kate Stewart' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company E', expenses: '310,000', employees: '8', contact: 'Louise Fall' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company F', expenses: '110,000', employees: '5', contact: 'Owen Thompson' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company G', expenses: '250,000', employees: '18', contact: 'Fred Wilton' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company H', expenses: '180,000', employees: '7', contact: 'William Dallas' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company J', expenses: '370,000', employees: '13', contact: 'Ron Douglas' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company K', expenses: '500,000', employees: '15', contact: 'Michael Jacobs' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company L', expenses: '230,000', employees: '10', contact: 'Stephanie Egerton' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company M', expenses: '90,000', employees: '25', contact: 'Michael Buckley' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company N', expenses: '370,000', employees: '13', contact: 'Sabrina Rowlands' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company O', expenses: '500,000', employees: '15', contact: 'Lana Watt' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company P', expenses: '230,000', employees: '10', contact: 'Evelynn Calderwood' },
	      height: 32,
	    },
	    {
	      data: { name: 'Company Q', expenses: '90,000', employees: '25', contact: 'Jade Morley' },
	      height: 32,
	    },
	  ];
	}
