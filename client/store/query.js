const GET_QUERY = 'GET_QUERY'

export const getQuery = query => ({
  type: GET_QUERY,
  query
})

const initialState = ''

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUERY:
      return action.query
    default:
      return state
  }
}
