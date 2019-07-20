import React, { useState, useEffect } from 'react'
import testService from './services/tests'
import Footer from './components/Footer'
import TestForm from './components/TestForm'
import Tests from './components/Tests'
import Notification from './components/Notification'


const App = () => {
  const [tests, setTests] = useState([]) 
  const [newName, setNewName] = useState('') 
  const [newUnits, setNewUnits] = useState('')
  const [newMin, setNewMin] = useState('')
  const [newMax, setNewMax] = useState('') 
  const [notification, setNotification] = useState({
    message: null
  })

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

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 10000)
  }
 
  const handleSubmit = (event) => {
    event.preventDefault()

    const existingTest = tests.find(p => p.name === newName)

    if (existingTest) {
      const ok = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella`)
      

      
      if (ok) {
        testService
          .replace({
            ...existingTest,
            units: newUnits
          })
          .then(replacedTest => {
            setTests(tests.map(p => p.name === newName ? replacedTest : p))
            setNewName('')
            setNewUnits('')
            notify(`Henkilön ${newName} numero muutettu`)
          })
          /*
          .catch(() => {
            setPersons(persons.filter(p => p.name !== newName))
            notify(`Henkilön ${newName} oli jo poistettu`, 'error')
          })
          */
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
        notify(`Lisättiin ${createdTest.name}`)
      })
  }

  const deleteTest = (id) => {
    const test = tests.find(p => p.id === id)
    const ok = window.confirm(`Poistetaanko ${test.name}`)
    if (ok) {
      testService
        .remove(id)
        .then(() => {
          setTests(tests.filter(p => p.id !== id))
        })
      notify(`Poistettiin ${test.name}`)
    }
  }


  return (
    <div>
      <h2>Laboratory Tests</h2>

      <Notification notification={notification} />

      <h3>add or modify a test</h3>

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

      <div>
        <Footer/>
      </div>
    </div>

  )

}

export default App