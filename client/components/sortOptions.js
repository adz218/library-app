import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {queryResult, clearSearch} from '../store/library'
import {changeViewInStore} from '../store/view'
import {clearFilters} from '../store/filters'
import {Button, ButtonGroup} from 'react-bootstrap'

const session = window.sessionStorage

class SortAndFilter extends Component {
  constructor(props) {
    super(props)
  }

  //onclick methods
  sortByFirstPublish() {
    const {library} = this.props
    const publish = 'first_publish_year'
    const noPublish = []

    //removing items with undefined publish dates
    const filteredDocs = library.filter(doc => {
      if (!doc[publish]) noPublish.push(doc)
      if (doc[publish]) return true
    })
    //sorting queried books by their publish dates
    filteredDocs.sort((book1, book2) => {
      return book1[publish] - book2[publish]
    })

    const publishSorted = noPublish.concat(filteredDocs)

    session.setItem('prevQuery', JSON.stringify(publishSorted))
    this.props.sortBy(publishSorted)
  }

  sortByMostRecent() {
    const {library} = this.props
    const publish = 'first_publish_year'
    const noPublish = []

    const filteredDocs = library.filter(doc => {
      if (!doc[publish]) noPublish.push(doc)
      if (doc[publish]) return true
    })

    filteredDocs.sort((book1, book2) => {
      return book2[publish] - book1[publish]
    })

    const publishSorted = filteredDocs.concat(noPublish)

    session.setItem('prevQuery', JSON.stringify(publishSorted))
    this.props.sortBy(publishSorted)
  }

  sortByMostEditions() {
    const {library} = this.props
    const editions = 'edition_count'
    const editionSorted = [...library].sort((book1, book2) => {
      return book2[editions] - book1[editions]
    })

    session.setItem('prevQuery', JSON.stringify(editionSorted))
    this.props.sortBy(editionSorted)
  }

  removeFilters() {
    session.setItem('prevQuery', JSON.stringify(JSON.parse(session.restore)))
    this.props.clearFilters()
    this.props.sortBy(JSON.parse(session.restore))
  }

  setActive(event) {
    const buttonIds = ['firstpublish', 'mostrecent', 'mosteditions']
    buttonIds.forEach(buttonId => {
      const button = document.getElementById(buttonId)
      button.setAttribute('class', 'btn btn-default')
    })

    const buttonSelected = document.getElementById(event)
    // console.log(event)
    // event.className = 'active'

    buttonSelected.setAttribute('class', 'btn btn-default active')
  }

  componentDidMount() {
    if (this.props.view.type === 'singleBook') {
      this.props.changeView({type: 'default'})
      session.setItem('currentView', 'default')
    }
  }

  render() {
    const {library} = this.props
    return library.length && this.props.view.type === 'default' ? (
      <div className="sort-option">
        <p>
          {`${library.length} hits`}{' '}
          <Button
            onClick={() => {
              this.props.history.push('/')
            }}
          >
            clear search
          </Button>
        </p>
        SORT BY:{' '}
        <ButtonGroup>
          <Button
            id="firstpublish"
            onClick={() => {
              this.sortByFirstPublish()
              this.setActive('firstpublish')
            }}
          >
            first published
          </Button>
          <Button
            id="mostrecent"
            onClick={() => {
              this.sortByMostRecent()
              this.setActive('mostrecent')
            }}
          >
            most recent
          </Button>
          <Button
            id="mosteditions"
            onClick={() => {
              this.sortByMostEditions()
              this.setActive('mosteditions')
            }}
          >
            most editions
          </Button>
        </ButtonGroup>
      </div>
    ) : null
  }
}

const mapState = state => ({
  library: state.library,
  view: state.view
})

const mapDispatch = dispatch => ({
  sortBy: books => dispatch(queryResult(books)),
  clearSearch: () => dispatch(clearSearch()),
  changeView: viewInfo => dispatch(changeViewInStore(viewInfo)),
  restoreSearch: info => dispatch(queryResult(info)),
  clearFilters: () => dispatch(clearFilters())
})
const ConnectedSortAndFilter = connect(
  mapState,
  mapDispatch
)(SortAndFilter)

export default withRouter(ConnectedSortAndFilter)
