import axios from 'axios'
const session = window.sessionStorage

const SET_SEARCH_CATEGORY = 'SET_SEARCH_CATEGORY'

export const setCategory = searchCategory => {
  session.setItem('prevCategory', searchCategory)
  return {
    type: SET_SEARCH_CATEGORY,
    searchCategory
  }
}

const initialState = 'General'

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_CATEGORY:
      return action.searchCategory
    default:
      return state
  }
}
