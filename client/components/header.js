import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const Header = props => (
  <div className="header-content">
    <span onClick={() => props.history.push('/')}>Look Book!</span>
  </div>
)

export default withRouter(Header)
