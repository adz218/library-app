import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Pager} from 'react-bootstrap'
import {changeViewInStore, restoreDefaultView} from '../store/view'

const session = window.sessionStorage

export class SingleBookComponent extends Component {
  constructor(props) {
    super(props)
  }

  handleSelect() {
    const {history} = this.props
    session.setItem('currentView', 'default')
    history.goBack()
    this.props.backToSearch()
  }

  render() {
    const {title, author, isbn, cover, oclc, lccn} = this.props.singleBookInfo
    return this.props.view.type === 'singleBook' ? (
      <Fragment>
        <div className="single-book-card">
          {cover && cover !== -1 ? (
            <img src={`https://covers.openlibrary.org/w/id/${cover}-M.jpg`} />
          ) : (
            <img src="https://openlibrary.org/images/icons/avatar_book.png" />
          )}
          <div className="card-content">
            <h3>{title}</h3>
            {author ? author : 'Author N/A'} <br />
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
    ) : null
  }
}

const mapState = state => ({
  singleBookInfo: state.view.info,
  view: state.view
})

const mapDispatch = dispatch => ({
  backToSearch: () => dispatch(restoreDefaultView()),
  changeView: viewInfo => dispatch(changeViewInStore(viewInfo))
})
const ConnectedSingleBook = connect(
  mapState,
  mapDispatch
)(SingleBookComponent)

export default withRouter(ConnectedSingleBook)
