import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Button} from 'react-bootstrap'

const Header = ({handleClick, isLoggedIn}) => (
  <div className="header">
    <div className="header-content">Open Library!</div>
  </div>
)

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(
  null,
  mapDispatch
)(Header)
