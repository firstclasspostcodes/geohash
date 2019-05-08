const { BoundingBox, Query, Key } = require('@firstclasspostcodes/geohash');
const Long = require('long');

const center = {  latitude: 48.97415,  longitude: -13.94988 };

const locations = [
  { name: 'North (50km)', latitude: 49.38859, longitude: -13.94823 },
  { name: 'East (50km)', latitude: 49.0009, longitude: -13.333 },
  { name: 'South (50km)', latitude: 48.51565, longitude: -13.95922 },
  { name: 'West (50km)', latitude: 48.97206, longitude: -14.64586 },
];

const points = locations.map(point => ({  ...point,
  ...Key.fromDegrees(point).toKeyObject(),
}));

/**
  This function mocks the DynamoDB query function
 */
const query = ({ ExpressionAttributeValues }) => {
  const { [':key']: key, [':min']: min, [':max']: max } = ExpressionAttributeValues;
  return {
    promise: async () => ({
      Items: points.filter(({ name, geokey, georange }) => {
        const geolong = Long.fromString(georange, false, 10);
        return key === geokey && geolong.gt(min) && geolong.lt(max);
      }),
    })
  };
}

const docClient = { query };

const query = new Query(docClient);

await query.find(center, 50 * 1000);