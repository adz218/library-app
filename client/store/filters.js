const SET_FILTER = 'SET_FILTER'
const CLEAR_FILTERS = 'CLEAR_FILTERS'

export const setFilter = filter => ({
  type: SET_FILTER,
  filter
})

export const clearFilters = filter => ({
  type: CLEAR_FILTERS
})

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return [...state, action.filter]
    case CLEAR_FILTERS:
      return []
    default:
      return state
  }
}
