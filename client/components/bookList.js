import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleBook from './SingleBook'

class QueriedItems extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const author = 'author_name'
    return (
      <div className="books-container">
        {this.props.library.docs &&
          this.props.library.docs.map(book => {
            return (
              <SingleBook
                title={book.title}
                isbn={book.isbn && book.isbn[0]}
                author={book[author] && book[author][0]}
              />
            )
          })}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  library: state.library
})

const ConnectedQueriedItems = connect(
  mapState,
  null
)(QueriedItems)

export default ConnectedQueriedItems
