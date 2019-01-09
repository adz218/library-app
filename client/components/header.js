import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

const Header = ({handleClick, isLoggedIn}) => (
  <div className="header-content">Open Library!</div>
)

export default connect(
  null,
  null
)(Header)
