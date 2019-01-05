import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, DropdownButton, MenuItem} from 'react-bootstrap'

import {setCategory} from '../store/searchCategory'

const SearchDropdown = props => (
  <DropdownButton title="Search By" id="dropdown">
    <MenuItem onSelect={() => props.setSearchCategory('General')}>
      General
    </MenuItem>
    <MenuItem onSelect={() => props.setSearchCategory('Title')}>Title</MenuItem>
    <MenuItem onSelect={() => props.setSearchCategory('Author')}>
      Author
    </MenuItem>
  </DropdownButton>
)

const mapDispatch = dispatch => ({
  setSearchCategory: category => dispatch(setCategory(category))
})

const ConnectedSearchDropdown = connect(
  null,
  mapDispatch
)(SearchDropdown)

export default ConnectedSearchDropdown
