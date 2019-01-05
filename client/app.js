import React from 'react'
import {connect} from 'react-redux'
import {Header, Search, QueriedItems, SearchDropdown} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Header />
      <SearchDropdown />
      <Search />
      <QueriedItems />
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  library: state.library
})

export default connect(
  mapState,
  null
)(App)
