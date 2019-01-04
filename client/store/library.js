import axios from 'axios'

const GET_QUERY_RESULT = 'GET_QUERY_RESULT'

const queryResult = searchInfo => ({type: GET_QUERY_RESULT, searchInfo})

export const generalSearch = searchInfo => {
  return async dispatch => {
    try {
      const formattedSearch = searchInfo.query.replace(' ', '+')
      const queryInfo = await axios.get(`/api/query/general/${formattedSearch}`)
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
      const formattedTitle = searchInfo.query.replace(' ', '+')
      const queryInfo = await axios.get(`/api/query/title/${formattedTitle}`)
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
      const formattedAuthorName = searchInfo.query.replace(' ', '+')
      const queryInfo = await axios.get(
        `/api/query/title/${formattedAuthorName}`
      )
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
