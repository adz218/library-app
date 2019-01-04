import axios from 'axios'

const GET_QUERY_RESULT = 'GET_QUERY_RESULT'

const queryResult = searchInfo => ({type: GET_QUERY_RESULT, searchInfo})

export const generalSearch = searchInfo => {
  return async dispatch => {
    try {
      const queryInfo = await axios.get('/api/query/general', searchInfo)
      const queryData = queryInfo.data
      dispatch(queryResult(queryData))
    } catch (err) {
      console.error(err)
    }
  }
}

export const titleSearch = searchInfo => {
  return async dispatch => {
    try {
      const queryInfo = await axios.post('/api/query/title', searchInfo)
      const queryData = queryInfo.data
      dispatch(queryResult(queryData))
    } catch (err) {
      console.error(err)
    }
  }
}

export const authorSearch = searchInfo => {
  return async dispatch => {
    try {
      const queryInfo = await axios.post('/api/query/author', searchInfo)
      const queryData = queryInfo.data
      dispatch(queryResult(queryData))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUERY_RESULT:
      return action.searchInfo
    default:
      return state
  }
}
