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

    const {docs} = this.props.library
    return (
      <div className="queried-books-container">
        <ListGroup>
          {docs &&
            docs.map((book, idx) => {
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
