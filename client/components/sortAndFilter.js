import React, {Component} from 'react'
import {connect} from 'react-redux'
import {queryResult} from '../store/library'

const session = window.sessionStorage

class SortAndFilter extends Component {
  constructor(props) {
    super(props)
    this.sortByFirstPublish = this.sortByFirstPublish.bind(this)
    this.sortByMostRecent = this.sortByMostRecent.bind(this)
    this.sortByMostEditions = this.sortByMostEditions.bind(this)
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
    this.props.sortByPublish(publishSorted)
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
    this.props.sortByPublish(publishSorted)
  }

  sortByMostEditions() {
    const {library} = this.props
    const editions = 'edition_count'
    const editionSorted = [...library].sort((book1, book2) => {
      return book2[editions] - book1[editions]
    })

    session.setItem('prevQuery', JSON.stringify(editionSorted))
    this.props.sortByPublish(editionSorted)
  }

  render() {
    const {library} = this.props
    return library.length ? (
      <div className="sort-and-filter-toolbar">
        <div className="sort-option">
          {`${library.length} hits`}
          SORT BY:
          <a onClick={() => this.sortByFirstPublish()}>first published</a>
          <a onClick={() => this.sortByMostRecent()}>most recent</a>
          <a onClick={() => this.sortByMostEditions()}>most editions</a>
        </div>
      </div>
    ) : null
  }
}

const mapState = state => ({
  library: state.library
})

const mapDispatch = dispatch => ({
  sortByPublish: books => dispatch(queryResult(books))
})
const ConnectedSortAndFilter = connect(
  mapState,
  mapDispatch
)(SortAndFilter)

export default ConnectedSortAndFilter
