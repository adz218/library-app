import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Header,
  Search,
  QueriedItems,
  SingleBookComponent,
  SortAndFilter
} from './components'
import {changeViewInStore, restoreDefaultView} from './store/view'
import {
  generalSearch,
  titleSearch,
  authorSearch,
  queryResult
} from './store/library'

const sessionStorage = window.sessionStorage

class App extends Component {
  constructor(props) {
    super(props)
  }

  formatSearch(category) {
    return 'send' + category + 'Search'
  }

  componentDidMount() {
    if (sessionStorage.prevQuery) {
      this.props.restoreSearch(JSON.parse(sessionStorage.prevQuery))
    }
    if (
      sessionStorage.currentView !== 'default' &&
      sessionStorage.currentView
    ) {
      this.props.changeView(JSON.parse(sessionStorage.currentView))
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Search />
        {this.props.view.type === 'default' && <SortAndFilter />}
        {this.props.view.type === 'default' && <QueriedItems />}
        {this.props.view.type === 'singleBook' && <SingleBookComponent />}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  library: state.library,
  view: state.view
})

const mapDispatch = dispatch => ({
  sendGeneralSearch: searchInput => dispatch(generalSearch(searchInput)),
  sendTitleSearch: searchInput => dispatch(titleSearch(searchInput)),
  sendAuthorSearch: searchInput => dispatch(authorSearch(searchInput)),
  changeView: viewInfo => dispatch(changeViewInStore(viewInfo)),
  restoreSearch: info => dispatch(queryResult(info))
})

export default connect(
  mapState,
  mapDispatch
)(App)
