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

  render() {
    const {title, author, isbn, cover, oclc, lccn} = this.props
    return (
      <ListGroupItem>
        <div className="list-item">
          {cover ? (
            <img
              src={`https://covers.openlibrary.org/w/id/${cover}-S.jpg`}
              onClick={() => this.viewSingleBook()}
            />
          ) : (
            <img
              src={`http://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`}
              onClick={() => this.viewSingleBook()}
            />
          )}{' '}
          <p onClick={() => this.viewSingleBook()}>{title} </p>
          {author}
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
