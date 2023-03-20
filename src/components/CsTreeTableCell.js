
import React, { useState, useEffect } from 'react';
import { Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync, faReply, faEraser, faClipboardList } from '@fortawesome/free-solid-svg-icons'

export const CsTreeHeader = ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
  <span {...getToggleAllRowsExpandedProps()}>
    {isAllRowsExpanded ? '-' : '+'}
  </span>
)

export const CsTreeCell = ({ value, row }) => {

  console.log(row.depth)

  const style = {
    paddingLeft: (row.depth) + 'rem'
  }

  return (row.canExpand ?
    <span
      {...row.getToggleRowExpandedProps({
        style,
      })}>
      {row.isExpanded ?
        '-'
      :
        '+'} {value}
    </span>
    :
    <span style={style}>
      {value}

    </span>
  )

}


export const CsEditCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onUpdate, // This is a custom function that we supplied to our table instance



}) => {

  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    onUpdate(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <Input value={value} onChange={onChange} onBlur={onBlur} />
}

export const CsSelectCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onUpdate, // This is a custom function that we supplied to our table instance
  options,


}) => {

  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    onUpdate(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <Input type='select' value={value} onChange={onChange} onBlur={onBlur}>
      {options.map(option => (
        <option key={option.key}>{option.value}</option>

      ))}
    </Input>
  )

}

export const CsIconCell = ({
  row: { index },
  column: { id },
  onUpdate, // This is a custom function that we supplied to our table instance



}) => {


  const onClick = e => {

    onUpdate(index, id)


  }


  return (
    <Button color="white" onClick={onClick}>
      <FontAwesomeIcon icon={faEraser} />
    </Button>
  )
}
