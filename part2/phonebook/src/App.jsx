import { useEffect, useState } from 'react'
import {getAll, create, remove, update} from './services/numbers.js'
import "./main.css"


const PersonForm = (props) => {
return (
<form>
  <div>
  Name: <input 
    value={props.newName}
    onChange={props.nameHandler}          
  />
</div>
  <div>
    Number: <input
      value={props.newNumber}
      onChange={props.numberHandler}
      />
  </div>
<div>
  <button type="submit" onClick={props.addPerson}>add</button>
</div>
</form>)
}

const Filter = (props) => {
  return(
    <div>
      Filter : <input
        value={props.filter}
        onChange={props.filterHandler}
        />
    </div>
  )
}

const DeleteButton = (props) => {
  return (
    <button type="submit" onClick={() => props.deletePerson(props.id, props.name)}>delete</button> 
  )
}

const Person = (props) => {
  return (
  <p>{props.name} {props.number} <DeleteButton deletePerson={props.deletePerson} id={props.id} name={props.name}/></p>
 )
}

const Persons = (props) => {
  return (
    <div> 
        {props.persons.map((person) => {
        if (person.name.toLowerCase().includes(props.filteredName.toLowerCase())){
          return (
            <Person key={person.id } name={person.name} number={person.number} deletePerson={props.deletePerson} id={person.id} />
            )
        } 
      })}
    </div>
  )
}

const Notification = ({ message}) => {
  if (message === null) {
    return null
  }
    return (
      <div className='person'>
        {message}
      </div>
    )
}

const ErrorMessage = ({message}) => {
  if(message === null){
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredName, setFilter] = useState('');
  const [Message, setMessage] = useState(null)
  const [Error, setError] = useState(null)
  
  useEffect(async ()  => {
      const response = await getAll()
      setPersons(response)
    }, [])

  const nameHandler = (event) => {
    setNewName(event.target.value)
  }
  
  const numberHandler = (event) => {
    setNewNumber(event.target.value)
  }
  
  const filterHandler = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    let flag = false
    persons.forEach(person => {
        console.log(person._id)
        if(person.name === newName){
          if(window.confirm(`${newName} already exists in the phonebook, replace the old number with the new one?`)){
            
            update(newPerson, person._id)
              .then(response => {
                console.log(response)
                const index = persons.findIndex(person => person.name === newName)
                if (index !== -1){
                  persons[index].number = newNumber
                  setPersons(persons);
                  setNewName("")
                  setNewNumber("")
                }
                })
              .catch(error => {
                console.log(error)
                setError(`Information of ${newName} has already been removed from the system`)
                setPersons(persons.filter(person => person.name !== newName))
                setTimeout(() => {
                  setError(null)
                },5000)
              })
            flag=true
          }else {
            flag=true
          }   
        }
      });


    if (!flag){
      create(newPerson)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${newPerson.name}`);
        setTimeout(() =>{
          setMessage(null)
        }, 5000)
        })
      .catch(error => {
        console.log(error)
        setError(`Encountered an error: ${error.response.data.error} Correct format: [Name] [Number({2,3} - {6}])`)
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
      }
    }

    const deletePerson = (id, name) => {

      if (window.confirm(`Remove ${name}?`)){
        remove(id)
          .then(response => {
            console.log(response)
            setPersons(persons.filter(person => person.id !== id))
          })
      }
    }
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filteredName} filterHandler={filterHandler}/>
      <h3>Add a new number</h3>
      <Notification message={Message} />
      <ErrorMessage message={Error} />
      <PersonForm newName={newName} newNumber={newNumber} nameHandler={nameHandler} numberHandler={numberHandler} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} filteredName={filteredName} deletePerson={deletePerson} />
    </div>  
  )
}

export default App