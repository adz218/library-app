import {expect} from 'chai'
import React from 'react'
import sinon from 'sinon'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Search from './search'
import FilterOptions from './filterOptions'
import FilterSubject from './filterSubject'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('<App />', () => {
  it('filter options renders up to 9 filter categories', () => {
    const filter = shallow(<FilterOptions />)
    expect(filter.find(FilterSubject)).to.have.lengthOf(9)
  })

  it('renders the search field with two spans', () => {
    const search = shallow(<Search />)
    expect(search.find('.span')).to.have.lengthOf(2)
  })

  it('submits query on click', () => {
    const submitQuery = sinon.spy()
    const search = shallow(<Search handleSubmit={submitQuery} />)
    search.find('#search-submit').simulate('click')
    expect(submitQuery).to.have.property('callCount', 1)
  })
})
