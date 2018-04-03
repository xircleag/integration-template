/* global it, describe */
const mochaPlugin = require('serverless-mocha-plugin')
const expect = mochaPlugin.chai.expect
const wrapped = mochaPlugin.getWrapper('verify', '/src/handlers.js', 'verify')

describe('aws:verify', () => {
  it('should return 400 if no paylod given', () => {
    const eventData = {}
    return wrapped.run(eventData, {}).then((res) => {
      expect(res.statusCode).to.be.equal(400)
    })
  })

  it('should return 200 on valid verification challenge', () => {
    const eventData = {
      queryStringParameters: {
        verification_challenge: 'testVerify'
      }
    }
    return wrapped.run(eventData, {}).then((res) => {
      expect(res.statusCode).to.be.equal(200)
    })
  })

  it('should return verification_challenge in the body', () => {
    const eventData = {
      queryStringParameters: {
        verification_challenge: 'testVerify'
      }
    }
    return wrapped.run(eventData, {}).then((res) => {
      expect(res.body).to.be.equal(eventData.queryStringParameters.verification_challenge)
    })
  })
})
