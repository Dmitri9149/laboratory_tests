import React from 'react'

const TestForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input onChange={props.handleNameChange} value={props.newName} />
      </div>
      <div>
        units: <input onChange={props.handleUnitsChange} value={props.newUnits} />
      </div>
      <div>
        min: <input onChange={props.handleMinChange} value={props.newMin} />
      </div>
      <div>
        max: <input onChange={props.handleMaxChange} value={props.newMax} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default TestForm