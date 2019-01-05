import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Pager} from 'react-bootstrap'
import {restoreDefaultView} from '../store/view'

const sessionStorage = window.sessionStorage

export class SingleBookComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {title, author, isbn, cover, oclc, lccn} = this.props.singleBookInfo
    return (
      <div>
        {title} - {author}
        <Pager>
          <Pager.Item onSelect={() => this.props.backToSearch()}>
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
