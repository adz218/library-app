import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ListGroupItem} from 'react-bootstrap'
import {changeViewInStore} from '../store/view'

const sessionStorage = window.sessionStorage

class SingleBookInList extends Component {
  constructor(props) {
    super(props)
  }

  viewSingleBook() {
    const viewInfo = {type: 'singleBook', info: this.props}
    sessionStorage.setItem('currentView', JSON.stringify(viewInfo))
    this.props.changeView(viewInfo)
  }

  editionQuantity() {
    if (this.props.editions > 1) {
      return `${this.props.editions} editions`
    } else {
      return `1 edition`
    }
  }

  render() {
    const {title, author, publish, isbn, cover, oclc, lccn} = this.props
    return (
      <ListGroupItem onClick={() => this.viewSingleBook()}>
        <div className="list-item">
          <div className="book-title-and-cover">
            {cover && (
              <img src={`https://covers.openlibrary.org/w/id/${cover}-S.jpg`} />
            )}
            {!cover && isbn && (
              <img src={`http://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`} />
            )}
            {!cover && !isbn && (
              <img src="https://openlibrary.org/images/icons/avatar_book-sm.png" />
            )}{' '}
            {title}
          </div>
          {author}
          <br />
          <p>
            {this.editionQuantity()}{' '}
            {publish && `- first published in ${publish}`}
          </p>
        </div>
      </ListGroupItem>
    )
  }
}

const mapState = state => ({
  view: state.view
})

const mapDispatch = dispatch => ({
  changeView: viewInfo => dispatch(changeViewInStore(viewInfo))
})

const ConnectedSingleBookInList = connect(
  mapState,
  mapDispatch
)(SingleBookInList)

export default ConnectedSingleBookInList
