import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  Header,
  Search,
  QueriedItems,
  SingleBookComponent,
  SortOptions,
  FilterOptions
} from './components'
import {changeViewInStore, restoreDefaultView} from './store/view'
import {
  generalSearch,
  titleSearch,
  authorSearch,
  queryResult
} from './store/library'

const session = window.sessionStorage

class App extends Component {
  constructor(props) {
    super(props)
  }

  formatSearch(category) {
    return 'send' + category + 'Search'
  }

  bookCheck() {
    this.props.changeView(JSON.parse(session.prevSingle))
  }
  componentDidMount() {
    if (session.prevQuery) {
      this.props.restoreSearch(JSON.parse(session.prevQuery))
    }
    if (session.currentView !== 'default' && session.currentView) {
      this.props.changeView(JSON.parse(session.currentView))
    }
  }

  render() {
    return (
      <div className="page-container">
        <Header />
        {this.props.view.type === 'default' &&
          session.prevSingle &&
          window.location.href.includes('/book/') &&
          this.bookCheck()}
        <Switch>
          <Route exact path="/" component={Search} />

          {this.props.view.type === 'singleBook' && (
            <Route
              path="/book/:title"
              render={() => (
                <Fragment>
                  <Search />
                  <SingleBookComponent />
                </Fragment>
              )}
            />
          )}

          <Route
            path="/search/:query"
            render={() => (
              <Fragment>
                <Search />
                <SortOptions />
                <div className="search-and-filter">
                  <QueriedItems /> <FilterOptions />
                </div>
              </Fragment>
            )}
          />
        </Switch>
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

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(App)
)
