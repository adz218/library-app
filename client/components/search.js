import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, FormControl, FormGroup, Form, InputGroup} from 'react-bootstrap'
import {
  generalSearch,
  titleSearch,
  authorSearch,
  clearSearch
} from '../store/library'
import {restoreDefaultView} from '../store/view'
import SearchDropdown from './searchDropDown'

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

  handleSubmit(event) {
    event.preventDefault()

    //clearing previous search and updating state to 'default' search view
    this.props.clearPreviousSearch()
    this.props.backToSearch()

    const searchType = 'send' + this.props.searchCategory + 'Search'
    this.props[searchType](this.state.query)

    //keeping track of most recent search on the session
    sessionStorage.setItem('prevQuery', this.state.query)
    sessionStorage.setItem('prevCategory', this.props.searchCategory)
    sessionStorage.setItem('currentView', 'default')

    //clearing the input search field
    this.setState({query: ''})
  }

  render() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup controlId="form-query">
          <InputGroup>
            <SearchDropdown />
          </InputGroup>
          <FormControl
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
            placeholder={`Search By ${this.props.searchCategory}`}
          />
          <Button type="submit">Submit</Button>
        </FormGroup>
      </Form>
    )
  }
}

const mapState = state => ({
  library: state.library,
  searchCategory: state.searchCategory,
  view: state.view.type
})

const mapDispatch = dispatch => ({
  sendGeneralSearch: searchInput => dispatch(generalSearch(searchInput)),
  sendTitleSearch: searchInput => dispatch(titleSearch(searchInput)),
  sendAuthorSearch: searchInput => dispatch(authorSearch(searchInput)),
  backToSearch: () => dispatch(restoreDefaultView()),
  clearPreviousSearch: () => dispatch(clearSearch())
})

const ConnectedSearchField = connect(
  mapState,
  mapDispatch
)(Search)
export default ConnectedSearchField
