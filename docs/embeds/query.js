export default `
const { Query } = require('@firstclasspostcodes/geohash');
const { DynamoDB } = require('aws-sdk');

const docClient = new DynamoDB.DocumentClient({
  service: new DynamoDB({ region: process.env.AWS_REGION }),
  params: {
    TableName: process.env.MY_TABLE,
    IndexName: process.env.POINT_INDEX_NAME,
  },
});

const center = { latitude: 48.97415, longitude: -13.94988 };

const query = new Query(docClient);

// find matching points up to 50km away
await query.find(center, 50 * 1000);
`;