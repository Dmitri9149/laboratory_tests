import React from 'react'
import Test from './Test'


const Tests = ({tests, deleteTest}) => tests.map(test =>
  <Test
    key = {test.id}
    test={test}
    deleteTestOf  = {deleteTest}
  />
)

export default Tests