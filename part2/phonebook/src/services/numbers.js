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

  const update = async(number, id) => {
    const request = axios.patch(`${url}/${id}`, {
      number: number 
    })
    return request.then(response => response.data)
  }

  export { 
    getAll, 
    create,
    remove,
    update
  }