import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {sendQueryThunk} from '../store/library'

export class SearchField extends Component {
  constructor(props) {
    super(props)
    this.state = {query: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.sendQuery(this.state)
    this.setState({query: ''})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
            placeholder="search here"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  library: state.library
})

const mapDispatch = dispatch => ({
  sendQuery: searchInput => dispatch(sendQueryThunk(searchInput))
})

const ConnectedSearchField = connect(
  mapState,
  mapDispatch
)(SearchField)
export default ConnectedSearchField
