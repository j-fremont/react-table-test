
import React, { useState, useEffect } from 'react';
import { Input, Button, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';





export const renderTextCell = (row, field, align = 'ltr') => {
	return (

		<span
			id={row.data.id + '_' + field}
			className={'ecs_tree-table_cell_' + align + ' ecs_tree-table_cell_found'}
			onMouseOver={(e) => {
				const tooltip = document.getElementById("tooltip");
				const x = e.clientX, y = e.clientY;
				tooltip.style.top = (y + 10) + 'px';
				tooltip.style.left = (x) + 'px';
				tooltip.style.display = 'block';
				tooltip.innerHTML = row.data[field];
			}}
			onMouseOut={(e) => {
				const tooltip = document.getElementById("tooltip");
				tooltip.style.display = 'none';
			}}>

			{row.data[field]}



		</span>


	)
}

/*

			<Tooltip
				isOpen={true}
				target={row.data.id + '_' + field}>
				Hello world!
			</Tooltip>

*/


export const renderInputCell = (row, field, regex = undefined) => {
	return (
		<Input
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
