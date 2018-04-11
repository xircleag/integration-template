'use strict'

/**
 * Layer IDK library
 * https://www.npmjs.com/package/@layerhq/idk
 */
const LayerIDK = require('@layerhq/idk')

// Load Layer configuration JSON and Create IDK instance by passing it to constructor
const configJSON = require(process.env.LAYER_CONFIG || './layer_config.json')
const layerIDK = new LayerIDK(configJSON)


/**
 * Webhook payload handler
 * https://docs.layer.com/reference/webhooks/payloads
 */
exports.webhook = (event, context, callback) => {

  // Initialize IDK logger by passing the function context
  const log = layerIDK.logger(context)

  try {
    /**
     * Verify and parse webhook payload
     * https://github.com/layerhq/idk#webhook
     */
    const webhook = layerIDK.webhook(event.headers, event.body)

    log.info(`Webhook: ${webhook.event.type}`)

    // Get sender ID
    const senderId = webhook.message.sender.id

    /**
     * Fetch full user identity object from API
     * Handle Promise and invoke the callback function when done
     */
    layerIDK.api.identities.get(senderId)
      .then(({ data }) => {
        log.info('Webhook: Sender full identity:', data)
        callback(null, { statusCode: 200 })
      })
      .catch((err) => {
        if (err.response) log.error(`Webhook: HTTP ${err.response.status}`, err.response.data)
        else log.error('Webhook:', err)
        callback(new Error('Error processing Webhook'))
      })
  } catch (err) {
    log.error('Webhook:', err)
    callback(err)
  }
}

/**
 * Webhook verification handler
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
