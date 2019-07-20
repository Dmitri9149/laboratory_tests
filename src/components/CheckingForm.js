import React from 'react'

const CheckingForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <tr>
      <td>
        name: <input onChange={props.handleNameChange} value={props.newName} />
      </td>
      <td>
        units: <input onChange={props.handleUnitsChange} value={props.newUnits} />
      </td>
      <td>
        min: <input onChange={props.handleMinChange} value={props.newMin} />
      </td>
      <td>
        max: <input onChange={props.handleMaxChange} value={props.newMax} />
      </td>
      <td>
        <button type="submit">check the value</button>
      </td>
      </tr>
    </form>
  )
}

export default CheckingForm