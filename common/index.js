'use strict'

module.exports = class Common {
  /**
   * Common class constructor
   *
   * @constructor
   * @param  {Object} layerIDK Layer IDK instance
   */
  constructor (layerIDK) {
    this.api = layerIDK.api
  }

  /**
   * Hello webhook method
   *
   * @param  {Object} webhook Layer Webhook payload
   */
  helloWebhook (webhook) {
    return new Promise((resolve, reject) => {
      resolve('Hello Webhook!')
    })
  }
}
