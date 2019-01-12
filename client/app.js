import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  Header,
  Search,
  QueriedItems,
  SingleBookComponent,
  SortOptions,
  FilterOptions,
  FilterList,
  Welcome
} from './components'
import {changeViewInStore, restoreDefaultView} from './store/view'
import {
  generalSearch,
  titleSearch,
  authorSearch,
  queryResult
} from './store/library'
import {getQuery} from './store/query'

const session = window.sessionStorage

class App extends Component {
  constructor(props) {
    super(props)
  }

  bookCheck() {
    this.props.changeView(JSON.parse(session.prevSingle))
  }

  searchCheck() {
    const searchQuery = window.location.href.split('/search/')
    const formattedSearch = searchQuery[1].split(' ').join('+')
    return this.props.query !== formattedSearch ? true : false
  }

  sendQuery() {
    const searchQuery = window.location.href.split('/search/')
    const formattedSearch = searchQuery[1].split(' ').join('+')
    this.props.changeView({type: 'default'})
    this.props.setQuery(formattedSearch)
    this.props.sendGeneralSearch(formattedSearch)
  }

  componentDidMount() {
    if (session.prevQuery) {
      this.props.restoreSearch(JSON.parse(session.prevQuery))
    }
    // if (session.currentView !== 'default' && session.currentView) {
    //   this.props.changeView(JSON.parse(session.currentView))
    // }
  }

  render() {
    return (
      <div className="page-container">
        <Header />
        {this.props.view.type === 'default' &&
          session.prevSingle &&
          window.location.href.includes('/book/') &&
          this.bookCheck()}

        {window.location.href.includes('/search/') &&
          this.searchCheck() &&
          this.sendQuery()}

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Fragment>
                <Search />
                <Welcome />
              </Fragment>
            )}
          />

          <Route
            exact
            path="/search/"
            render={() => (
              <Fragment>
                <Search />
                <Welcome />
              </Fragment>
            )}
          />

          {this.props.view.type === 'singleBook' && (
            <Route path="/book/:title" component={SingleBookComponent} />
          )}

          <Route
            path="/search/:query"
            render={() => (
              <Fragment>
                <Search />
                <SortOptions />
                <FilterList />
                <div className="search-and-filter">
                  <QueriedItems /> <FilterOptions />
                </div>
              </Fragment>
            )}
          />

          <Route
            render={() => (
              <Fragment>
                <Search />
                <Welcome />
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
  view: state.view,
  search: state.searchCategory,
  query: state.query
})

const mapDispatch = dispatch => ({
  sendGeneralSearch: searchInput => dispatch(generalSearch(searchInput)),
  sendTitleSearch: searchInput => dispatch(titleSearch(searchInput)),
  sendAuthorSearch: searchInput => dispatch(authorSearch(searchInput)),
  changeView: viewInfo => dispatch(changeViewInStore(viewInfo)),
  restoreSearch: info => dispatch(queryResult(info)),
  setQuery: query => dispatch(getQuery(query))
})

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(App)
)
