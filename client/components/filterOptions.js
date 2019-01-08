import React, {Component} from 'react'
import {connect} from 'react-redux'
import {queryResult} from '../store/library'
import FilterSubject from './filterSubject'

/*
users can filter by:
author, subject, people, places, times, first published, publisher, language
*/
class FilterOptions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const subjects = [
      'author_name',
      'first_publish_year',
      'subject',
      'person',
      'place',
      // 'time',
      // 'publisher',
      // 'language',
      'ebook_count_i'
    ]
    const {library} = this.props

    return library.length ? (
      <div className="filter-options">
        FILTER BY:
        {subjects.map(subject => {
          return <FilterSubject filterSubject={subject} />
        })}
      </div>
    ) : null
  }
}

const mapState = state => ({
  library: state.library
})

const ConnectedFilterOptions = connect(
  mapState,
  null
)(FilterOptions)
export default ConnectedFilterOptions
