import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Pager} from 'react-bootstrap'
import {restoreDefaultView} from '../store/view'

const sessionStorage = window.sessionStorage

export class SingleBookComponent extends Component {
  constructor(props) {
    super(props)
  }

  handleSelect() {
    this.props.backToSearch()
    sessionStorage.setItem('currentView', 'default')
  }

  render() {
    const {title, author, isbn, cover, oclc, lccn} = this.props.singleBookInfo
    return (
      <div>
        <div>
          {cover ? (
            <img src={`https://covers.openlibrary.org/w/id/${cover}-M.jpg`} />
          ) : (
            <img src={`http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`} />
          )}
        </div>
        {title} - {author} - ISBN: {isbn}
        <Pager>
          <Pager.Item onSelect={() => this.handleSelect()}>
            Back To Search
          </Pager.Item>
        </Pager>
      </div>
    )
  }
}

const mapState = state => ({
  singleBookInfo: state.view.info
})

const mapDispatch = dispatch => ({
  backToSearch: () => dispatch(restoreDefaultView())
})
const ConnectedSingleBook = connect(
  mapState,
  mapDispatch
)(SingleBookComponent)

export default ConnectedSingleBook
