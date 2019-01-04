import React, {Component} from 'react'
import {connect} from 'react-redux'
// import SingleItemContainer from './SingleItemContainer'

class QueriedItems extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const title = 'title_suggest'
    const numFound = 'numFound'
    const docs = 'docs'
    console.log('thispropslibrary', this.props.library)

    return (
      <div>
        {this.props.library.docs &&
          this.props.library.docs.map(book => {
            return <div>{book.title}</div>
          })}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  library: state.library
})

const ConnectedQueriedItems = connect(
  mapState,
  null
)(QueriedItems)

export default ConnectedQueriedItems
