import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const Header = props => (
  <div className="header-content">
    <span onClick={() => props.history.push('/')} style={{cursor: 'pointer'}}>
      LOOK BOOK!
    </span>
  </div>
)

export default withRouter(Header)
