const chai = require('chai')
const sinon = require('sinon')

chai.should()

describe('middleware', () => {
  describe('when instantiated', () => {
    let options = {
      // middlewarePath: '/falcor-postman',
      app: {
        use: sinon.spy()
      }
    }

    /* eslint global-require: "off" */
    let middleware = require('./../middleware/')(options)

    it('should be a valid middleware function', () => {
      middleware.should.be.instanceof(Function)
      middleware.length.should.be.equal(3)
    })

    it('should configure serving static files', () => {
      sinon.assert.calledOnce(options.app.use)
    })

    describe('when invoked and options.middlewarePath doesn\'t match req.url', () => {
      const req = { url: '/' }
      const res = { status: sinon.stub(), send: sinon.stub() }
      const next = sinon.stub()

      middleware(req, res, next)

      it('should call next', () => {
        sinon.assert.called(next)
      })
    })

    describe('when invoked at default /falcor-postman (and options.middlewarePath is not defined) matches req.url', () => {
      const req = { url: '/falcor-postman' }
      const res = { status: sinon.stub(), send: sinon.stub() }
      const next = sinon.stub()

      middleware(req, res, next)

      it('should call res.status w/ 200', () => {
        sinon.assert.calledWith(res.status, 200)
      })

      it('should call res.send', () => {
        sinon.assert.called(res.send)
      })

      it('should not call next', () => {
        sinon.assert.notCalled(next)
      })
    })

    describe('when invoked at custom defined path /postman matches req.url', () => {
      const req = { url: '/postman' }
      const res = { status: sinon.stub(), send: sinon.stub() }
      const next = sinon.stub()

      options = {
        middlewarePath: '/postman',
        app: {
          use: sinon.spy()
        }
      }
      middleware = require('../middleware')(options)
      middleware(req, res, next)

      it('should call res.status w/ 200', () => {
        sinon.assert.calledWith(res.status, 200)
      })

      it('should call res.send', () => {
        sinon.assert.called(res.send)
      })

      it('should not call next', () => {
        sinon.assert.notCalled(next)
      })
    })
  })
})
