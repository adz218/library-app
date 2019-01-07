import axios from 'axios'
const session = window.sessionStorage

const GET_QUERY_RESULT = 'GET_QUERY_RESULT'
const CLEAR_SEARCH = 'CLEAR_SEARCH'
const SORT_SEARCH = 'SORT_SEARCH'

export const queryResult = searchInfo => ({type: GET_QUERY_RESULT, searchInfo})
export const clearSearch = () => ({
  type: CLEAR_SEARCH
})

export const publishSort = sortedBooks => ({
  type: SORT_SEARCH,
  sortedBooks
})

export const generalSearch = searchInfo => {
  return async dispatch => {
    try {
      const formattedSearch = searchInfo.replace(' ', '+')
      const queryInfo = await axios.get(`/api/query/general/${formattedSearch}`)
      const {docs} = queryInfo.data
      console.log('query result', docs)
      session.setItem('prevQuery', JSON.stringify(docs))
      dispatch(queryResult(docs))
    } catch (err) {
      console.error(err)
    }
  }
}

export const titleSearch = searchInfo => {
  return async dispatch => {
    try {
      const formattedTitle = searchInfo.replace(' ', '+')
      const queryInfo = await axios.get(`/api/query/title/${formattedTitle}`)
      const {docs} = queryInfo.data
      session.setItem('prevQuery', JSON.stringify(docs))
      dispatch(queryResult(docs))
    } catch (err) {
      console.error(err)
    }
  }
}

export const authorSearch = searchInfo => {
  return async dispatch => {
    try {
      const formattedAuthorName = searchInfo.replace(' ', '+')
      const queryInfo = await axios.get(
        `/api/query/author/${formattedAuthorName}`
      )
      const {docs} = queryInfo.data
      session.setItem('prevQuery', JSON.stringify(docs))
      dispatch(queryResult(docs))
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
    case CLEAR_SEARCH:
      return []
    default:
      return state
  }
}
