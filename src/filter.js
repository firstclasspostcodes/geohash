const Long = require('long');

const { boundingBoxHashRanges } = require('./src/boundingBox');

const withinRadius = (hashKey, rangeKey) => (center, locations, meters = 1000) => {
  const { latitude, longitude } = center;
  const cells = boundingBoxHashRanges(latitude, longitude, meters);

  return locations.filter(({ hash, key }) => {
    const geohash = Long.fromString(hash, false, 10);

    const matches = cells.filter(({ key: cellKey, min, max }) => (
      key === cellKey && geohash.gt(min) && geohash.lt(max)
    ));

    return matches.length > 0;
  });
};

module.exports = {
  withinRadius,
};