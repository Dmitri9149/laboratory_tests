import React from 'react'

const CheckingForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <table>
      <tbody>
      <tr>
      <td>
        test name: <input onChange={props.handleNameChange} value={props.newName} />
      </td>
      <td>
        test value: <input onChange={props.handleMinChange} value={props.newMin} />
      </td>
      <td>
        <button type="submit">check the value</button>
      </td>
      </tr>
      </tbody>
      </table>
    </form>
  )
}

export default CheckingForm