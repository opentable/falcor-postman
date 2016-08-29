import React from 'react'
import { shallow, mount } from 'enzyme'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'
import App from '../../app/app'

chai.should()
chai.use(chaiEnzyme())

describe('<App />', () => {
  describe('when rendered', () => {
    it('then it calls componentDidMount', () => {
      sinon.spy(App.prototype, 'componentDidMount')
      const props = { falcorPath: '/model.json' }
      mount(<App {...props} />)

      App.prototype.componentDidMount.calledOnce.should.equal(true)
      App.prototype.componentDidMount.restore()
    })

    it('then it should have descendants "div.App"', () => {
      const props = { falcorPath: '/model.json' }
      const wrapper = shallow(<App {...props} />)

      wrapper.should.have.descendants('div.App')
    })
  })
})
