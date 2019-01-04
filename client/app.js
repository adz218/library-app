import React from 'react'
import {connect} from 'react-redux'
import {Navbar, GeneralSearch, QueriedItems} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <GeneralSearch />
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
