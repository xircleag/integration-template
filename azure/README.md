# [Microsoft Azure](https://serverless.com/framework/docs/providers/azure/)

Make sure you configure [Azure Credentials](https://serverless.com/framework/docs/providers/azure/guide/credentials/) before deploying the integration.

## Deploy

Install [layer-integrations](https://www.npmjs.com/package/layer-integrations) CLI and run the following command to deploy your integration:

    layer-integrations deploy

## Logs

Access Serverless [function logs](https://serverless.com/framework/docs/providers/azure/cli-reference/logs/) so you can monitor your integration:

    serverless logs -f webhook -t