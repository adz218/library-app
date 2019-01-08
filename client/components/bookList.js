import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleBookInList from './SingleBookInList'
import {ListGroup, ListGroupItem} from 'react-bootstrap'

class QueriedItems extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const author = 'author_name'
    const cover = 'cover_i'
    const publish = 'first_publish_year'
    const editionQuant = 'edition_count'

    const {library} = this.props
    return (
      <div className="queried-books-container">
        <ListGroup>
          {library.length > 0 &&
            library.map((book, idx) => {
              return (
                <SingleBookInList
                  title={book.title}
                  author={book[author] && book[author][0]}
                  publish={book[publish] && book[publish]}
                  editions={book[editionQuant]}
                  isbn={book.isbn && book.isbn[0]}
                  cover={book[cover]}
                  oclc={book.oclc && book.oclc}
                  lccn={book.lccn && book.lccn}
                  key={idx}
                />
              )
            })}
          {library.noneFound && (
            <div className="queried-books-container">No Results Found</div>
          )}
        </ListGroup>
      </div>
    )
  }
}

const mapState = state => ({
  library: state.library
})

const ConnectedQueriedItems = connect(
  mapState,
  null
)(QueriedItems)

export default ConnectedQueriedItems
