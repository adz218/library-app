import React, {Component, Fragment} from 'react'
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
      <Fragment>
        <div className="single-book-card">
          {cover && (
            <img src={`https://covers.openlibrary.org/w/id/${cover}-M.jpg`} />
          )}
          {!cover && isbn && (
            <img src={`http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`} />
          )}
          {!cover && !isbn && (
            <img src="https://openlibrary.org/images/icons/avatar_book-sm.png" />
          )}
          <div className="card-content">
            <h3>{title}</h3>
            {author} <br />
            {isbn && (
              <a href={`https://openlibrary.org/isbn/${isbn}`}>
                For More Information
              </a>
            )}
          </div>
        </div>

        <Pager>
          <Pager.Item onSelect={() => this.handleSelect()}>
            Back To Search
          </Pager.Item>
        </Pager>
      </Fragment>
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
