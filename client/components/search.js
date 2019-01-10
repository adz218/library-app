import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {Button, FormControl, FormGroup, Form, InputGroup} from 'react-bootstrap'
import {
  generalSearch,
  titleSearch,
  authorSearch,
  clearSearch
} from '../store/library'
import {restoreDefaultView} from '../store/view'
import {getQuery} from '../store/query'
import {clearFilters, setFilter} from '../store/filters'
import {setCategory} from '../store/searchCategory'
import SearchDropdown from './searchDropDown'

const session = window.sessionStorage

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

  formatSearch(str) {
    return str.split(' ').join('+')
  }

  handleSubmit(event) {
    event.preventDefault()

    //clearing previous search and updating state to 'default' search view
    this.props.clearPreviousSearch()
    this.props.backToSearch()

    const searchType = 'send' + this.props.searchCategory + 'Search'
    this.props[searchType](this.state.query)

    this.props.getQuery(this.formatSearch(this.state.query))
    this.props.history.push(`/search/${this.formatSearch(this.state.query)}`)

    session.setItem('currentView', 'default')
    this.props.clearFilters()
    //clearing the input search field
    this.setState({query: ''})
  }

  componentDidMount() {
    if (session.prevCategory) {
      this.props.previousSearchCat(session.prevCategory)
    }
  }

  render() {
    const button = document.getElementById('search-submit')
    if (button && this.state.query.length === 0) {
      button.setAttribute('class', 'btn btn-primary disabled')
    } else if (button && this.state.query.length > 0) {
      button.setAttribute('class', 'btn btn-primary')
    }
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup controlId="form-query">
          <InputGroup>
            <InputGroup.Button>
              <SearchDropdown />
            </InputGroup.Button>

            <FormControl
              type="text"
              name="query"
              value={this.state.query}
              onChange={this.handleChange}
              placeholder={`Search By ${this.props.searchCategory}`}
            />
            <InputGroup.Button>
              <Button type="submit" bsStyle="primary" id="search-submit">
                Submit
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </Form>
    )
  }
}

const mapState = state => ({
  library: state.library,
  searchCategory: state.searchCategory,
  view: state.view.type,
  query: state.query
})

const mapDispatch = dispatch => ({
  sendGeneralSearch: searchInput => dispatch(generalSearch(searchInput)),
  sendTitleSearch: searchInput => dispatch(titleSearch(searchInput)),
  sendAuthorSearch: searchInput => dispatch(authorSearch(searchInput)),
  backToSearch: () => dispatch(restoreDefaultView()),
  clearPreviousSearch: () => dispatch(clearSearch()),
  previousSearchCat: cat => dispatch(setCategory(cat)),
  getQuery: query => dispatch(getQuery(query)),
  clearFilters: () => dispatch(clearFilters())
})

const ConnectedSearchField = connect(
  mapState,
  mapDispatch
)(Search)
export default withRouter(ConnectedSearchField)
