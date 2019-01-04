import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {generalSearch, titleSearch, authorSearch} from '../store/library'

export class Search extends Component {
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
    const searchType = 'send' + this.props.searchCategory + 'Search'
    this.props[searchType](this.state)
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
            placeholder={`Search By ${this.props.searchCategory}`}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  library: state.library,
  searchCategory: state.searchCategory
})

const mapDispatch = dispatch => ({
  sendGeneralSearch: searchInput => dispatch(generalSearch(searchInput)),
  sendTitleSearch: searchInput => dispatch(titleSearch(searchInput)),
  sendAuthorSearch: searchInput => dispatch(authorSearch(searchInput))
})

const ConnectedSearchField = connect(
  mapState,
  mapDispatch
)(Search)
export default ConnectedSearchField
