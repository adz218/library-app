import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const Header = props => (
  <div className="header-container">
    <div className="header-content">
      <span onClick={() => props.history.push('/')} style={{cursor: 'pointer'}}>
        LOOK BOOK!
      </span>
    </div>

    <div className="single-link">
      <a onClick={() => props.history.push('/')}>HOME</a>
    </div>

    <div className="single-link">
      <a href="https://github.com/adz218/library-app">GITHUB</a>
    </div>

    <div className="single-link">
      <a href="https://linkedin.com/in/adz218">LINKEDIN</a>
    </div>

    <div className="single-link">
      <a href="https://openlibrary.org/developers/api">OPEN LIBRARY</a>
    </div>
  </div>
)

export default withRouter(Header)
