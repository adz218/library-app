import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clearFilters} from '../store/filters'
import {queryResult} from '../store/library'
import {Button} from 'react-bootstrap'
const session = window.sessionStorage

class AppliedFilters extends Component {
  constructor(props) {
    super(props)
  }

  removeFilters() {
    session.setItem('prevQuery', JSON.stringify(JSON.parse(session.restore)))
    this.props.clearFilters()
    this.props.sortBy(JSON.parse(session.restore))
  }

  render() {
    return this.props.filters.length > 0 ? (
      <div className="filter-container">
        Filters Applied:
        <ul id="filter-list">
          {this.props.filters.map((filter, idx) => {
            return <li key={idx}> / {filter}</li>
          })}
        </ul>
        <div className="removefiltercontainer">
          <Button onClick={() => this.removeFilters()}>remove filters</Button>
        </div>
      </div>
    ) : null
  }
}

const mapState = state => ({
  filters: state.filters
})

const mapDispatch = dispatch => ({
  clearFilters: () => dispatch(clearFilters()),
  sortBy: books => dispatch(queryResult(books))
})

export default connect(
  mapState,
  mapDispatch
)(AppliedFilters)
