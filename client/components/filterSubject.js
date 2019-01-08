import React, {Component} from 'react'
import {connect} from 'react-redux'
import {queryResult} from '../store/library'

class FilterSubject extends Component {
  constructor(props) {
    super(props)
  }

  handleSelect(event) {}
  mapHandler(categoryObject) {
    let category = []
    for (let prop in categoryObject) {
      category.push(
        <p>
          {prop} - {categoryObject[prop]}
        </p>
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

    console.log('subject and values', filterSubject, categoryObject)
    return (
      <div>
        {filterSubject}
        {this.mapHandler(categoryObject)}
      </div>
    )
  }
}

const mapState = state => ({
  library: state.library
})

const ConnectedFilterSubject = connect(
  mapState,
  null
)(FilterSubject)
export default ConnectedFilterSubject
