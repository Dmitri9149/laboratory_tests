import React from 'react'

const Tests = (props) => {
  return (
    props.tests.map(p =>
      <div key={p.name}>
        {p.name} {p.units}{p.min} {p.max}<button onClick={()=>props.deleteTest(p.id)}>poista</button>
      </div>
    )
  )
}

export default Tests