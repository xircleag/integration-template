# Layer Integration Template

This template provides a good starting point when developing Layer integrations from scratch. This template is using the Layer [Integration Development Kit](https://docs.layer.com/reference/integrations/framework) for rapid serverless application development.

This integration template listens for all messages that are sent in the Layer application and fetches the sender full identity via API. This implementation is only for demonstration purposes.

## Prerequisites

[Serverless](https://serverless.com) toolkit and [layer-integrations](https://www.npmjs.com/package/layer-integrations) command line tool.

    sudo npm install -g serverless layer-integrations

## Cloud Providers

This integration can be deployed one of the following cloud providers:

- [Amazon AWS](./aws)
- [Microsoft Azure](./azure)
