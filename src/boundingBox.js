/*
* Copyright 2010-2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License").
* You may not use this file except in compliance with the License.
* A copy of the License is located at
*
* http://aws.amazon.com/apache2.0
*
* or in the "license" file accompanying this file. This file is distributed
* on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
* express or implied. See the License for the specific language governing
* permissions and limitations under the License.
*/

const { S2LatLng, S2LatLngRect } = require('nodes2ts');
const { S2RegionCoverer } = require('nodes2ts');

const Key = require('./key');

const { generateHashKey, generateKeyRange } = require('./key');

class BoundingBox {
  constructor(latitude, longitude, radius = 0) {
    const center = S2LatLng.fromDegrees(latitude, longitude);
    const latRefUnit = latitude > 0 ? -1.0 : 1.0;
    const lngRefUnit = longitude > 0 ? -1.0 : 1.0;
    const referenceLat = S2LatLng.fromDegrees(latitude + latRefUnit, longitude);
    const referenceLng = S2LatLng.fromDegrees(latitude, longitude + lngRefUnit);
    const latRadius = radius / center.getEarthDistance(referenceLat).toNumber();
    const lngRadius =  radius / center.getEarthDistance(referenceLng).toNumber();
    const minLatLng = S2LatLng.fromDegrees(latitude - latRadius, longitude - lngRadius);
    const maxLatLng = S2LatLng.fromDegrees(latitude + latRadius, longitude + lngRadius);
    this.box = S2LatLngRect.fromLatLng(minLatLng, maxLatLng);
  }

  contains(latitude, longitude) {
    const { box } = this;
    const point = S2LatLng.fromDegrees(latitude, longitude);
    return box.containsLL(point);
  }

  hashRanges(keyLength = 7) {
    const { box } = this;
    const cells = new S2RegionCoverer().getCoveringCells(box);
    const ranges = cells.map(cell => Key.keyRanges(cell.rangeMin().id, cell.rangeMax().id, keyLength));
    const flattened = [].concat(...ranges);
    return flattened.map(({ min, max }) => {
      const hashKey = new Key(min).key(keyLength);
      return { 
        key: hashKey.toString(10),
        min: min.toString(10),
        max: max.toString(10),
      };
    });
  }
}

module.exports = BoundingBox;