import React from 'react'
import {connect} from 'react-redux'

const SingleBook = props => {
  return (
    <div className="single-book-card">
      <p>
        {' '}
        {props.cover ? (
          <img
            src={`https://covers.openlibrary.org/w/id/${props.cover}-S.jpg`}
          />
        ) : (
          <img
            src={`http://covers.openlibrary.org/b/isbn/${props.isbn}-S.jpg`}
          />
        )}
        {props.title} - {props.author}
      </p>
    </div>
  )
}

export default SingleBook
