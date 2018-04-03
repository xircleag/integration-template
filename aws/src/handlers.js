'use strict'

const LayerIDK = require('@layerhq/idk')
const Common = require('common')

const configJSON = require(process.env.LAYER_CONFIG || './layer_config.json')
const layerIDK = new LayerIDK(configJSON)

/**
 * Webhook function handler
 * https://serverless.com/framework/docs/providers/aws/guide/functions/
 */
exports.webhook = (event, context, callback) => {
  const log = layerIDK.logger(context)

  try {
    const webhook = layerIDK.webhook(event.headers, event.body)
    const common = new Common(layerIDK)

    log.info('Webhook:', webhook.event.type)

    common.helloWebhook(webhook)
      .then((res) => {
        log.info('Webhook: OK')
        callback(null, { statusCode: 200, body: res })
      })
      .catch((err) => {
        log.error('Webhook:', err)
        callback(new Error('Error processing webhook'))
      })
  } catch (err) {
    log.error('Webhook: ', err)
    callback(err)
  }
}

/**
 * Verify webhook
 * https://docs.layer.com/reference/webhooks/rest.out#verify
 */
exports.verify = (event, context, callback) => {
  const log = layerIDK.logger(context)
  const query = event.queryStringParameters

  log.info('Verify:', query)
  callback(null, {
    statusCode: query ? 200 : 400,
    body: query ? query.verification_challenge : 'Missing `verification_challenge` URL query parameter'
  })
}
