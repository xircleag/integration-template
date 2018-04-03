'use strict'

const common = require('../')

describe('common.helloWebhook', () => {
  it('should return hello webhook', () => {
    return common.helloWebhook()
      .then((data) => {
        data.should.eql('Hello Webhook!')
      })
  })
})
