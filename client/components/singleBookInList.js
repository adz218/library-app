import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ListGroupItem} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'
import {changeViewInStore} from '../store/view'

const sessionStorage = window.sessionStorage

class SingleBookInList extends Component {
  constructor(props) {
    super(props)
  }

  viewSingleBook() {
    const viewInfo = {type: 'singleBook', info: this.props}
    sessionStorage.setItem('currentView', JSON.stringify(viewInfo))
    sessionStorage.setItem('prevSingle', JSON.stringify(viewInfo))
    this.props.changeView(viewInfo)
    const formattedTitle = this.props.title.split(' ').join('+')
    this.props.history.push(`/book/${formattedTitle}`)
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
    const blankStyles = {width: '70px', height: '100px', 'margin-right': '1rem'}
    return (
      <ListGroupItem onClick={() => this.viewSingleBook()}>
        <div className="list-item">
          <div className="book-title-and-cover">
            {cover ? (
              <img
                src={`https://covers.openlibrary.org/w/id/${cover}-M.jpg`}
                className="search-cover-img"
                style={blankStyles}
              />
            ) : (
              <img
                src="https://openlibrary.org/images/icons/avatar_book-sm.png"
                style={blankStyles}
              />
            )}
            <div className="book-li">
              <p>
                <b className="book-li-title">{title}</b>
                <br />
                {author ? author : 'N/A'}
                <br />
                {this.editionQuantity()}{' '}
                {publish && `- first published in ${publish}`}
              </p>
            </div>
          </div>
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

//changes
const ConnectedSingleBookInList = connect(
  mapState,
  mapDispatch
)(SingleBookInList)

export default withRouter(ConnectedSingleBookInList)
