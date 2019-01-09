import React, {Component} from 'react'
import {connect} from 'react-redux'
import {queryResult} from '../store/library'

const session = window.sessionStorage

class FilterSubject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemsToShow: 5
    }

    this.showMore = this.showMore.bind(this)
    this.showLess = this.showLess.bind(this)
  }

  handleSelect(value) {
    const {library, filterSubject, updateFilter} = this.props
    let filteredBooks

    if (filterSubject !== 'ebook_count_i') {
      filteredBooks = library.filter(book => {
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
    }

    if (filterSubject === 'ebook_count_i') {
      if (value == 'yes') {
        filteredBooks = library.filter(book => {
          if (book[filterSubject] && book[filterSubject] > 0) return true
        })
      }
      if (value == 'no') {
        filteredBooks = library.filter(book => {
          if (!book[filterSubject] || book[filterSubject] === 0) return true
        })
      }
    }

    session.setItem('prevQuery', JSON.stringify(filteredBooks))
    updateFilter(filteredBooks)
  }

  mapHandler(categoryObject) {
    let category = []
    for (let specificVal in categoryObject) {
      category.push(
        <li>
          <a onClick={() => this.handleSelect(specificVal)}>
            {specificVal} - {categoryObject[specificVal]}{' '}
          </a>
        </li>
      )
    }
    return category.slice(0, this.state.itemsToShow)
  }

  underscoreRemoved(name) {
    if (name === 'ebook_count_i') return 'Ebook?'
    else if (name === 'first_publish_year') return 'published'
    else return name.replace('_', ' ')
  }

  showMore() {
    this.setState({itemsToShow: this.state.itemsToShow + 5})
  }

  showLess() {
    this.setState({itemsToShow: this.state.itemsToShow - 5})
  }
  render() {
    const {library, filterSubject} = this.props
    let categoryObject = {}

    if (filterSubject !== 'ebook_count_i') {
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
    }

    if (filterSubject === 'ebook_count_i') {
      categoryObject.yes = 0
      categoryObject.no = 0
      library.forEach(book => {
        if (book[filterSubject]) {
          if (book[filterSubject] > 0) {
            categoryObject.yes++
          } else {
            categoryObject.no++
          }
        } else {
          categoryObject.no++
        }
      })
    }

    const filterQuantity = Object.keys(categoryObject).length

    return (
      <div className="filter-subject-container">
        <b>
          {Object.keys(categoryObject).length > 0 &&
            this.underscoreRemoved(filterSubject)}
        </b>
        <ul>{this.mapHandler(categoryObject)}</ul>
        <div className="show-more-or-less">
          <p>
            {filterQuantity > 5 && (
              <button onClick={() => this.showMore()}>show more</button>
            )}
            {this.state.itemsToShow > 5 && (
              <button onClick={() => this.showLess()}>show less</button>
            )}
          </p>
        </div>
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
