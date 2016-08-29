require('babel-core/register')({ presets: ['es2015', 'react'] })

const chai = require('chai')
const sinon = require('sinon')
chai.should()

describe('middleware', () => {
  describe('when instantiated', () => {
    const options = { middlewarePath: '/falcor-postman' }
    const middleware = require('../middleware')(options)

    it('then it should be instance of Function', () => {
      middleware.should.be.instanceof(Function)
    })

    describe('when invoked and options.middlewarePath doesn\'t match req.url', () => {
      const req = { url: '/' }
      const res = { status: sinon.stub(), send: sinon.stub() }
      const next = sinon.stub()

      middleware(req, res, next)

      it('then next called', () => {
        sinon.assert.called(next)
      })
    })

    describe('when invoked and options.middlewarePath matches req.url', () => {
      const req = { url: options.middlewarePath }
      const res = { status: sinon.stub(), send: sinon.stub() }
      const next = sinon.stub()

      middleware(req, res, next)

      it('then res.status called w/ 200', () => {
        sinon.assert.calledWith(res.status, 200)
      })

      it('then res.send called', () => {
        sinon.assert.called(res.send)
      })

      it('then next not called', () => {
        sinon.assert.notCalled(next)
      })
    })
  })
})