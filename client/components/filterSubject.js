import React, {Component} from 'react'
import {connect} from 'react-redux'
import {queryResult} from '../store/library'

const session = window.sessionStorage

class FilterSubject extends Component {
  constructor(props) {
    super(props)
  }

  handleSelect(value) {
    const {library, filterSubject, updateFilter} = this.props
    const filteredBooks = library.filter(book => {
      if (book[filterSubject]) {
        if (
          Array.isArray(book[filterSubject]) &&
          book[filterSubject].includes(value)
        ) {
          return true
        } else if (book[filterSubject] == value) {
          return true
        }
      }
    })

    session.setItem('prevQuery', JSON.stringify(filteredBooks))
    updateFilter(filteredBooks)
  }

  mapHandler(categoryObject) {
    let category = []
    for (let specificVal in categoryObject) {
      category.push(
        <a onClick={() => this.handleSelect(specificVal)}>
          {specificVal} - {categoryObject[specificVal]}{' '}
        </a>
      )
    }
    return category
  }
  render() {
    const {library, filterSubject} = this.props
    let categoryObject = {}

    library.forEach(book => {
      if (book[filterSubject]) {
        if (Array.isArray(book[filterSubject])) {
          book[filterSubject].forEach(categoryValue => {
            categoryObject[categoryValue]
              ? (categoryObject[categoryValue] += 1)
              : (categoryObject[categoryValue] = 1)
          })
        } else {
          if (categoryObject[book[filterSubject]]) {
            categoryObject[book[filterSubject]] += 1
          } else {
            categoryObject[book[filterSubject]] = 1
          }
        }
      }
    })

    return (
      <div>
        <b>{Object.keys(categoryObject).length > 0 && filterSubject}</b>
        {this.mapHandler(categoryObject)}
      </div>
    )
  }
}

const mapState = state => ({
  library: state.library
})

const mapDispatch = dispatch => ({
  updateFilter: filteredBooks => dispatch(queryResult(filteredBooks))
})

const ConnectedFilterSubject = connect(
  mapState,
  mapDispatch
)(FilterSubject)
export default ConnectedFilterSubject
