import React from 'react'
import {connect} from 'react-redux'
import {Header, Search, QueriedItems, SingleBookComponent} from './components'
import Routes from './routes'

const sessionStorage = window.sessionStorage

const App = props => {
  return (
    <div>
      <Header />
      <Search />
      {props.view.type === 'default' && <QueriedItems />}
      {props.view.type === 'singleBook' && <SingleBookComponent />}
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  library: state.library,
  view: state.view
})

export default connect(
  mapState,
  null
)(App)
