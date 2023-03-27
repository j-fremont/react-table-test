
import React, { useState, useEffect } from 'react';
import { Input, Button, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// className={'ecs_tree-table_cell_' + align + (current ? ' ecs_tree-table_cell_found_current' : (found && ' ecs_tree-table_cell_found'))}


const foundTextClass = (row, field, tabledata) => {
	const found = tabledata.searchPositions.some(p => p.top===row.$state.top && p.column===field);
	return found ? 'ecs_tree-table_cell_found' : '';
}

const foundCurrentTextClass = (row, field, tabledata) => {
	const current = tabledata.searchPosition && tabledata.searchPosition.top===row.$state.top && tabledata.searchPosition.column===field;
	return current ? 'ecs_tree-table_cell_found_current' : '';
}

const duplicateTextClass = (row, field, tabledata) => {
	const duplicate = tabledata.duplicatePositions.some(p => p.top===row.$state.top && p.column===field);
	return duplicate ? 'ecs_tree-table_cell_duplicate' : '';
}

const textClass = (row, field, tabledata) => {
	return foundTextClass(row, field, tabledata) + ' ' + foundCurrentTextClass(row, field, tabledata) + ' ' + duplicateTextClass(row, field, tabledata);
}

const onMouseOver = (e, innerHTML) => {
	const tooltip = document.getElementById("tooltip");
	const x = e.clientX, y = e.clientY;
	tooltip.style.top = (y + 10) + 'px';
	tooltip.style.left = (x) + 'px';
	tooltip.style.display = 'block';
	tooltip.innerHTML = innerHTML;
}

const onMouseOut = (e) => {
	const tooltip = document.getElementById("tooltip");
	tooltip.style.display = 'none';
}



export const renderTextCell = (row, field, tabledata, align = 'ltr') => {

	const className = 'ecs_tree-table_cell_' + align + ' ' + textClass(row, field, tabledata);

	return (


		<span
			id={row.data.id + '_' + field}
			className={className}
			onMouseOver={(e) => onMouseOver(e, row.data[field])}
			onMouseOut={onMouseOut}>
			{row.data[field]}
		</span>



	)
}

export const renderTreeTextCell = (row, field, tabledata, align = 'ltr') => {

	const className = 'ecs_tree-table_cell_' + align + ' ' + textClass(row, field, tabledata);

	return (

		<div
			style={{ paddingLeft: (row.metadata.depth * 15) + 'px'}}
			classNclassName={row.metadata.hasChildren ? 'with-children' : 'without-children'}>
			{row.metadata.hasChildren ? (
				<button className="toggle-button" onClick={row.toggleChildren}></button>
			) : ''}
			<span
				id={row.data.id + '_' + field}
				className={className}
				onMouseOver={(e) => onMouseOver(e, row.data[field])}
				onMouseOut={onMouseOut}>
				{row.data[field]}
			</span>
		</div>


	)

}






export const renderInputCell = (row, field, tabledata, regex = undefined) => {

	const className = textClass(row, field, tabledata);

	return (
		<input
			className={className}
			style={{borderRadius: '5px'}}
			type={'text'}
			value={row.data[field]}
			onChange={(e) => {
				let value = e.target.value;
				if (regex && !regex.test(value)) { value = row.data[field]; }
				row.updateData({
					...row.data,
					[field]: value
				});
			}} />
	);
}

export const renderSelectCell = (row, field, options = []) => {
	return (
		<Input
			type={'select'}
			value={row.data[field]}
			onChange={(e) => {
				let value = e.target.value;
				row.updateData({
					...row.data,
					[field]: value
				});
			}}>
				<option default key={'none'} value={'none'}>None</option>
				{options.map(o => (
					<option key={o.name} value={o.name}>{o.name}</option>
				))}
		</Input>
	);
}

export const renderIconCell = (row, icon, onClick) => {
	return (
		<Button
			color={'transparent'}
			onClick={(e) => {
				onClick(row);
			}}>
			<FontAwesomeIcon icon={icon} />
		</Button>
	);
}
