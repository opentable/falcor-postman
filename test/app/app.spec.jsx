import React from 'react'
import { shallow, mount } from 'enzyme'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'
import App from './../../src/app'
import { jsdom } from 'jsdom'

chai.should()
chai.use(chaiEnzyme())

const LocalStorage = require('node-localstorage').LocalStorage;
global.localStorage = new LocalStorage('./../localStorageTemp');
global.document = jsdom('');
global.window = document.defaultView;
global.window.localStorage = global.localStorage;


describe('<App />', () => {
  const then = sinon.stub() // info: need to find a better way to mock a Promise
  const props = {
    model: () => ({ get: () => ({ then }) }),
    falcorPath: '/model.json',
  }

  describe('when rendered', () => {
    it('then "componentDidMount" should be called once', () => {
      sinon.spy(App.prototype, 'componentDidMount')
      mount(<App {...props} />)

      App.prototype.componentDidMount.calledOnce.should.equal(true)
      App.prototype.componentDidMount.restore()
    })

    it('then it should have descendants "div.App"', () => {
      const wrapper = shallow(<App {...props} />)

      wrapper.should.have.descendants('div.App')
    })

    describe('and "onChange" ".App-textarea.query"', () => {
      it('then "handleOnChange" should be called', () => {
        sinon.spy(App.prototype, 'updateQuery')
        const wrapper = mount(<App {...props} />)

        wrapper.find('.App-textarea.query').simulate('change')

        App.prototype.updateQuery.calledOnce.should.equal(true)
        App.prototype.updateQuery.restore()
      })
    })

    describe('and "onClick" "button"', () => {
      it('then "handleOnClick" should be called', () => {
        sinon.spy(App.prototype, 'handleOnClick')
        const wrapper = mount(<App {...props} />)

        wrapper.find('button').simulate('click')

        App.prototype.handleOnClick.calledOnce.should.equal(true)
        App.prototype.handleOnClick.restore()
      })
    })

    describe('and "falcorGet"', () => {
      it('then ".then" w/ response should be called', () => {
        const wrapper = mount(<App {...props} />)
        then.yields({})

        wrapper.find('button').simulate('click')

        sinon.assert.called(then)
      })

      it('then ".then" w/o response should be called', () => {
        const wrapper = mount(<App {...props} />)
        then.yields(null)

        wrapper.find('button').simulate('click')

        sinon.assert.called(then)
      })
    })
  })
})
