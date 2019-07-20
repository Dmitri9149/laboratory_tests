import React, { useState, useEffect } from 'react'
import testService from './services/tests'
import Footer from './components/Footer'


const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}


const Tests = (props) => {
  return (
    props.tests.map(p =>
      <div key={p.name}>
        {p.name} {p.number} <button onClick={()=>props.deleteTest(p.id)}>poista</button>
      </div>
    )
  )
}

const TestForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        nimi: <input onChange={props.handleNameChange} value={props.newName} />
      </div>
      <div>
        numero: <input onChange={props.handleNumberChange} value={props.newNumber} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const App = () => {
  const [tests, setTests] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
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
  const handleNumberChange = (event) => setNewNumber(event.target.value)

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
            number: newNumber
          })
          .then(replacedTest => {
            setTests(tests.map(p => p.name === newName ? replacedTest : p))
            setNewName('')
            setNewNumber('')
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
        number: newNumber
      })
      .then(createdTest => {
        setTests(tests.concat(createdTest))
        setNewName('')
        setNewNumber('')
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
      <h2>Puhelinluettelo</h2>

      <Notification notification={notification} />

      <h3>lisää uusi</h3>

      <TestForm 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Tests</h3>

      <Tests tests={tests} deleteTest={deleteTest} />

      <div>
        <Footer/>
      </div>
    </div>

  )

}

export default App