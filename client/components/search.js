import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {generalSearch, titleSearch, authorSearch} from '../store/library'

const sessionStorage = window.sessionStorage

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

  formatSearch(category) {
    return 'send' + category + 'Search'
  }

  handleSubmit(event) {
    event.preventDefault()
    const searchType = 'send' + this.props.searchCategory + 'Search'
    this.props[searchType](this.state)
    sessionStorage.setItem('prevQuery', this.state.query)
    sessionStorage.setItem('prevCategory', this.props.searchCategory)
    console.log('sessionStorage set at submit', sessionStorage)
    this.setState({query: ''})
  }

  componentDidMount() {
    //need to perform check here to see if previous state existed,
    //if so prev state should persist through refresh
    console.log('sessionStorage at mount', sessionStorage)
    if (sessionStorage.prevQuery) {
      this.props[this.formatSearch(sessionStorage.prevCategory)]({
        query: sessionStorage.prevQuery
      })
    }
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
