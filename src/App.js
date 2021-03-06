import React, { useState, useEffect } from 'react'
import testService from './services/tests'
import Footer from './components/Footer'
import TestForm from './components/TestForm'
import Tests from './components/Tests'
import Notification from './components/Notification'
import CheckingForm from './components/CheckingForm'


const App = () => {
  const [tests, setTests] = useState([]) 
  const [newName, setNewName] = useState('') 
  const [newUnits, setNewUnits] = useState('')
  const [newMin, setNewMin] = useState('')
  const [newMax, setNewMax] = useState('') 
  const [notification, setNotification] = useState({
    message: null
  })
  const [testName, setTestName] = useState('')
  const [testValue, setTestValue] = useState('')


  useEffect(() => {
    testService.getAll()
      .then(data => {
        setTests(data)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleUnitsChange = (event) => setNewUnits(event.target.value)
  const handleMinChange = (event) => setNewMin(event.target.value)
  const handleMaxChange = (event) => setNewMax(event.target.value)

  const handleTestName = (event) => setTestName(event.target.value)
  const handleTestValue = (event) => setTestValue(event.target.value)


  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 10000)
  }
 
  const handleSubmit = (event) => {
    event.preventDefault()

    const existingTest = tests.find(p => p.name === newName)

    if (existingTest) {
      const ok = window.confirm(`${newName} the test with the name already exist, confirm the modification`)
       
      if (ok) {
        testService
          .replace({
            ...existingTest,
            units: newUnits,
            min:newMin,
            max:newMax

          })
          .then(replacedTest => {
            setTests(tests.map(p => p.name === newName ? replacedTest : p))
            setNewName('')
            setNewUnits('')
            setNewMin('')
            setNewMax('')
            notify(`Test with  ${newName} is changed`)
          })
      }

      return
    } 
     
  testService
      .create({
        name: newName,
        units: newUnits,
        min:newMin,
        max:newMax

      })
      .then(createdTest => {
        setTests(tests.concat(createdTest))
        setNewName('')
        setNewUnits('')
        setNewMin('')
        setNewMax('')
        notify(`Added the test  ${createdTest.name}`)
      })
  }

  const handleChecking = (event) => {
    console.log('we are in handleChecking')
    event.preventDefault()

    const existingTest = tests.find(p => p.name === testName)
    console.log('existing Test ', existingTest)

    if (existingTest) {
      const logic = (testValue > existingTest.min)&&(testValue < existingTest.max)

      logic
      ? notify('Within the range !', 'success')
      : notify('Out of range or check the type of value!', 'error')

      setTestName('')
      setTestValue('')
      return 
    }

    notify('There is no a test with the name !', 'error')
    setTestName('')
    setTestValue('')
    return
  }

  const deleteTest = (id) => {
    const test = tests.find(p => p.id === id)
    const ok = window.confirm(`confirm the  ${test.name} deletion`)
    if (ok) {
      testService
        .remove(id)
        .then(() => {
          setTests(tests.filter(p => p.id !== id))
        })
      notify(`The test  ${test.name} was deleted`)
    }
  }


  return (
    <div>
      <h2>Laboratory Tests</h2>

      <Notification notification={notification} />

      <h3>Add or modify a test</h3>
    
      <TestForm 
        handleNameChange={handleNameChange}
        handleUnitsChange={handleUnitsChange}
        handleMaxChange={handleMaxChange}
        handleMinChange={handleMinChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newUnits={newUnits}
        newMax={newMax}
        newMin={newMin}
      />

      <h3>Tests</h3>

      <table>
        <tbody>
          <Tests 
            tests = {tests}
            deleteTest = {deleteTest}
          />  
        </tbody>
      </table>

      <h3>Fill the fields for a value checking</h3>


      <CheckingForm 
        handleTestName={handleTestName}
        handleTestValue={handleTestValue}

        handleChecking={handleChecking}

        testName={testName}
        testValue={testValue}
      /> 

      <Footer/>

    </div>

  )

}

export default App