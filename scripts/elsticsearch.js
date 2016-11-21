const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'http://localhost:9200',
  log: 'debug'
});

client.indices.putMapping({
  index: 'shopify',
  type: 'module',
  body: {
    properties: {
      title: { type: 'string' },
    }
  }
})