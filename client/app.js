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

  componentDidMount() {
    console.log('cdm of app')
    if (session.prevQuery) {
      this.props.restoreSearch(JSON.parse(session.prevQuery))
    }
    if (session.currentView !== 'default' && session.currentView) {
      this.props.changeView(JSON.parse(session.currentView))
    }
  }
  // {this.props.view.type === 'default' && <SortOptions />}
  //
  // {this.props.view.type === 'default' && session.prevQuery ? (
  //   <div className="search-and-filter">
  //     <QueriedItems /> <FilterOptions />
  //   </div>
  // ) : null}

  //{this.props.view.type === 'singleBook' && <SingleBookComponent />}

  render() {
    return (
      <div className="page-container">
        <Header />
        <Search />

        <Switch>
          {this.props.view.type === 'singleBook' && (
            <Route path="/book/:title" component={SingleBookComponent} />
          )}{' '}
          <Route
            path="/"
            render={() => (
              <Fragment>
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
