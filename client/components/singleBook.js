import React from 'react'
import {connect} from 'react-redux'

const SingleBook = props => {
  return (
    <div className="single-book-card">
      <p>
        {' '}
        <img src={`http://covers.openlibrary.org/b/isbn/${props.isbn}-S.jpg`} />
        {props.title} - {props.author}
      </p>
    </div>
  )
}

export default SingleBook
