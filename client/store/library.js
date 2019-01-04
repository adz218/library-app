import axios from 'axios'

const GET_QUERY_RESULT = 'GET_QUERY_RESULT'

const queryResult = searchInfo => ({type: GET_QUERY_RESULT, searchInfo})

export const sendQueryThunk = searchInfo => {
  return async dispatch => {
    try {
      const queryInfo = await axios.post('/api/query', searchInfo)
      const queryData = queryInfo.data
      console.log('response data', queryData)
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
