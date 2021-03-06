import React, {Component} from 'react'
import {Well} from 'react-bootstrap'
import {connect} from 'react-redux'
import {queryResult} from '../store/library'
import FilterSubject from './filterSubject'
const session = window.sessionStorage
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
      'time',
      'publisher',
      'language',
      'ebook_count_i'
    ]
    const ebook = 'ebook_count_i'
    const {view, library} = this.props

    return view.type === 'default' && session.prevQuery && library.length ? (
      <div className="filter-options">
        <Well id="well-container">
          FILTER BY:
          {subjects.map((subject, idx) => {
            return <FilterSubject filterSubject={subject} key={idx} />
          })}
        </Well>
      </div>
    ) : null
  }
}

const mapState = state => ({
  library: state.library,
  view: state.view
})

const ConnectedFilterOptions = connect(
  mapState,
  null
)(FilterOptions)
export default ConnectedFilterOptions
