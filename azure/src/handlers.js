'use strict'

/**
 * Layer IDK library
 * https://www.npmjs.com/package/@layerhq/idk
 */
const LayerIDK = require('@layerhq/idk')

// Load Layer configuration JSON and Create IDK instance by passing it to constructor
const configJSON = require(process.env.LAYER_CONFIG || './layer_config.json')
const layerIDK = new LayerIDK(configJSON)

// Fake service key from config
const serviceKey = configJSON.service_key

exports.webhook = (context, req) => {

  // Initialize IDK logger by passing the function context
  const log = layerIDK.logger(context)

  try {
    /**
     * Verify and parse webhook payload
     * https://github.com/layerhq/idk#webhook
     */
    const webhook = layerIDK.webhook(event.headers, event.body)

    log.info(`Webhook: ${webhook.event.type} (${serviceKey})`)

    // Get sender ID
    const senderId = webhook.message.sender.id

    /**
     * Fetch full user identity object from API
     * Handle Promise and invoke the done function when done
     */
    layerIDK.api.identities.get(senderId)
      .then(({ data }) => {
        log.info('Webhook: Sender full identity:', data)

        context.res = { status: 200 }
        context.done()
      })
      .catch((err) => {
        if (err.response) log.error(`Webhook: HTTP ${err.response.status}`, err.response.data)
        else log.error('Webhook:', err)
        context.res = { status: 500 }
        context.done()
      })
  } catch (err) {
    log.error('Webhook:', err)
    context.res = { status: 500 }
    context.done()
  }
}

exports.verify = (context, req) => {
  const log = layerIDK.logger(context)
  const query = req.query

  log.info('Verify:', query)
  context.res = {
    status: query ? 200 : 400,
    headers: { 'Content-Type': 'text/plain' },
    body: query ? query.verification_challenge : 'Missing `verification_challenge` URL query parameter',
    isRaw: true
  }
  context.done()
}
