import axios from "axios";
const url = "/api/persons"

const getAll = async () => {
    const request = axios.get(url)
    return request.then(response => response.data)
  } 
  
  const create = async (newNumber) => {
    const request = axios.post(url, newNumber)
    return request.then(response => response.data)
  }

  const remove = async (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
  }

  const update = async(person, id) => {
    const request = axios.put(`${url}/${id}`, person)
    return request.then(response => response.data)
  }

  export { 
    getAll, 
    create,
    remove,
    update
  }