import React, {Component} from 'react'
import {connect} from 'react-redux'
import {queryResult, clearSearch} from '../store/library'
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
    this.props.sortBy(JSON.parse(session.restore))
  }

  componentDidMount() {
    console.log('cdm???', session)
    if (session.prevQuery) {
      this.props.restoreSearch(JSON.parse(session.prevQuery))
    }
    // if (session.currentView !== 'default' && session.currentView) {
    //   console.log('entering on refersh', JSON.parse(session.currentView))
    //
    //   this.props.changeView(JSON.parse(session.currentView))
    // }
  }

  render() {
    const {library} = this.props
    return library.length && this.props.view.type === 'default' ? (
      <div className="sort-option">
        <p>{`${library.length} hits`}</p>
        SORT BY:
        <ButtonGroup>
          <Button onClick={() => this.sortByFirstPublish()}>
            first published
          </Button>
          <Button onClick={() => this.sortByMostRecent()}>most recent</Button>
          <Button onClick={() => this.sortByMostEditions()}>
            most editions
          </Button>
          <Button onClick={() => this.removeFilters()}>remove filters</Button>
          <Button onClick={() => this.props.clearSearch()}>clear search</Button>
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
  restoreSearch: info => dispatch(queryResult(info))
})
const ConnectedSortAndFilter = connect(
  mapState,
  mapDispatch
)(SortAndFilter)

export default ConnectedSortAndFilter
