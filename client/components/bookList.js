import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleBook from './SingleBook'

class QueriedItems extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const author = 'author_name'
    const cover = 'cover_i'
    return (
      <div className="books-container">
        {this.props.library.docs &&
          this.props.library.docs.map((book, idx) => {
            return (
              <SingleBook
                title={book.title}
                author={book[author] && book[author][0]}
                isbn={book.isbn && book.isbn[0]}
                cover={book[cover]}
                key={idx}
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
