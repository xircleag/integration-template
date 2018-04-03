/* global it, describe */
const mochaPlugin = require('serverless-mocha-plugin')
const expect = mochaPlugin.chai.expect
const wrapped = mochaPlugin.getWrapper('webhook', '/src/handlers.js', 'webhook')

const body = require('./mock/event.json')
const headers = require('./mock/headers.json')

describe('aws:webhook', () => {
  it('should return 200 with body', () => {
    const eventData = {
      headers,
      body: JSON.stringify(body)
    }

    return wrapped.run(eventData, {}).then((res) => {
      expect(res.statusCode).to.be.equal(200)
      expect(res.body).to.be.equal('Hello Webhook!')
    })
  })
})
