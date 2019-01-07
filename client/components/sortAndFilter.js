import React, {Component} from 'react'
import {connect} from 'react-redux'
import {queryResult} from '../store/library'
class SortAndFilter extends Component {
  constructor(props) {
    super(props)
  }

  //onclick methods
  sortByFirstPublish() {
    const {docs} = this.props.library
    const publish = 'first_publish_year'
    const postSort = []

    //removing items with undefined publish dates
    const filteredDocs = docs.filter(doc => {
      if (!doc[publish]) postSort.push(doc)
      if (doc[publish]) return true
    })
    //sorting queried books by their publish dates
    filteredDocs.sort((book1, book2) => {
      return book1[publish] - book2[publish]
    })

    const result = postSort.concat(filteredDocs)
    this.props.sortByPublish({docs: result})
  }

  render() {
    const {docs} = this.props.library
    return docs ? (
      <div className="sort-and-filter-toolbar">
        <div className="sort-option">
          {`${docs.length} hits`}
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
