import React from 'react'
import Test from './Test'


const Tests = ({tests, deleteTest}) => tests.map(test =>
  <Test
    key = {test.id}
    test={test}
    deleteTest  = {deleteTest}
  />
)

export default Tests