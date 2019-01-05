const SET_VIEW = 'SET_VIEW'
const RESTORE_DEFAULT = 'RESTORE_DEFAULT'

export const changeViewInStore = viewInfo => ({
  type: SET_VIEW,
  viewInfo
})

export const restoreDefaultView = () => ({
  type: RESTORE_DEFAULT
})

const initialState = {type: 'default'}
//otherwise single book view 'singleBook'
// or single author view 'singleAuthor'

export default function(state = initialState, action) {
  switch (action.type) {
    case RESTORE_DEFAULT:
      return {type: 'default'}
    case SET_VIEW:
      return {type: action.viewInfo.type, info: action.viewInfo.info}
    default:
      return state
  }
}
