import React, {Component} from 'react'
import {connect} from 'react-redux'
import {queryResult} from '../store/library'
class SortAndFilter extends Component {
  constructor(props) {
    super(props)
  }

  //onclick methods
  sortByFirstPublish() {
    const {library} = this.props
    const publish = 'first_publish_year'
    const postSort = []

    //removing items with undefined publish dates
    const filteredDocs = library.filter(doc => {
      if (!doc[publish]) postSort.push(doc)
      if (doc[publish]) return true
    })
    //sorting queried books by their publish dates
    filteredDocs.sort((book1, book2) => {
      return book1[publish] - book2[publish]
    })

    const result = postSort.concat(filteredDocs)
    this.props.sortByPublish(result)
  }

  render() {
    const {library} = this.props
    return library.length ? (
      <div className="sort-and-filter-toolbar">
        <div className="sort-option">
          {`${library.length} hits`}
          SORT BY:
          <a onClick={() => this.sortByFirstPublish()}>first published</a>
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
