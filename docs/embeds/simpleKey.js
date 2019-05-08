export default `
const { Key } = require('@firstclasspostcodes/geohash');

const center = { latitude: 48.97415, longitude: -13.94988 };

// create our hash key
const key = Key.fromDegrees(center);

// set a key length (7 is best for 1km);
const keyLength = 7;

key.toKeyObject(keyLength);
`;