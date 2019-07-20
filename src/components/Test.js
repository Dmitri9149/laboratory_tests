import React from 'react'

const Test = ({ test, deleteTest }) => {
  return (

    <tr>
      <td>
        {test.id}
      </td>
      <td>
        {test.name}
      </td>
      <td>
        {test.units}
      </td>
      <td>
        {test.min}
      </td>
      <td>
        {test.max}
      </td>
      <td>
        <button onClick={() => deleteTest(test.id)}>delete</button>
      </td>
    </tr>

  )
}

export default Test