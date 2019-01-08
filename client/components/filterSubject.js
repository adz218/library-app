import React, {Component} from 'react'
import {connect} from 'react-redux'
import {queryResult} from '../store/library'

const FilterSubject = props => {
  const {library, filterSubject} = props
  let obj = {}

  library.forEach(book => {
    obj[book[filterSubject]]
      ? (obj[book[filterSubject]] += 1)
      : (obj[book[filterSubject]] = 1)
  })

  console.log('subject and values', filterSubject, obj)
  return <div>THIS IS THE FILTERSUB: {filterSubject}</div>
}

const mapState = state => ({
  library: state.library
})

const ConnectedFilterSubject = connect(
  mapState,
  null
)(FilterSubject)
export default ConnectedFilterSubject
