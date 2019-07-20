import axios from 'axios'

const baseUrl = 'http://localhost:3001/tests'

const getAll = () => {
  const promise = axios.get(baseUrl)

  return promise.then(response => response.data)
}

const create = (test) => {
  const promise = axios.post(baseUrl, test)

  return promise.then(response => response.data)
}

const remove = (id) => {
  const promise = axios.delete(`${baseUrl}/${id}`)

  return promise.then(response => response.data)
}

const replace = (test) => {
  const promise = axios.put(`${baseUrl}/${test.id}`, test)

  return promise.then(response => response.data)
}

export default {
  getAll, create, remove, replace
}