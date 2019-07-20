import React from 'react'

const CheckingForm = (props) => {
  return (
    <form onSubmit={props.handleChecking}>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                test name: <input onChange={props.handleTestName} value={props.testName} />
              </td>
              <td>
                test value: <input onChange={props.handleTestValue} value={props.testValue} />
              </td>
              <td>
                <button type="submit">check the value</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  )
}

export default CheckingForm