export default `
const { BoundingBox } = require('@firstclasspostcodes/geohash');

const center = { latitude: 48.97415, longitude: -13.94988 };

// create a bounding box with a radius 50km
const box = new BoundingBox(center.latitude, center.longitude, 50 * 1000);

const ranges = box.hashRanges(7);

ranges[0];
`;