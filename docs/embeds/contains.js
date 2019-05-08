export default `
const { BoundingBox } = require('@firstclasspostcodes/geohash');

const center = { latitude: 48.97415, longitude: -13.94988 };

// ~50km due east
const location = { latitude: 49.0009, longitude: -13.333 };

// create a bounding box with a radius 50km
const box = new BoundingBox(center.latitude, center.longitude, 50 * 1000);

box.contains(location.latitude, location.longitude);
`;