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

const { S2Cell, S2LatLng } = require('nodes2ts');
const Long = require('long');

class Key {
  constructor(hash) {
    this.hash = hash;
    if (typeof hash === 'string') {
      this.hash = Long.fromString(hash, false, 10);
    }
  }

  key(length = 7) {
    const { hash } = this;
    const offset = hash.lessThan(0) ? 1 : 0;
    const denominator = Math.pow(10, hash.toString(10).length - length - offset);
    return hash.divide(denominator);
  }

  toKeyObject(keyLength = 7) {
    return {
      geokey: this.key(keyLength).toString(10),
      georange: this.hash.toString(10),
    };
  }

  static fromDegrees({ latitude, longitude }) {
    const latLng = S2LatLng.fromDegrees(latitude, longitude);
    return new Key(S2Cell.fromLatLng(latLng).id.id);
  }

  static keyRanges(min, max, keyLength = 7) {
    const keys = [];
    const minHashKey = new Key(min).key(keyLength);
    const maxHashKey = new Key(max).key(keyLength);
    const denominator = Math.pow(10, min.toString().length - minHashKey.toString().length);
    if (minHashKey.equals(maxHashKey)) {
      return [{ min, max }];
    }
    for (let key = minHashKey; key.lessThanOrEqual(maxHashKey); key = key.add(1)) {
      const gtZero = key.greaterThan(0);
      const isMin = key.equals(minHashKey);
      const isMax = key.equals(maxHashKey);
      keys.push({
        min: isMin ? min : (gtZero ? key.multiply(denominator) : key.subtract(1).multiply(denominator).add(1)), 
        max: isMax ? max : (gtZero ? key.add(1).multiply(denominator).subtract(1) : l.multiply(denominator)),
      });
    }
    return keys;
  }
}

module.exports = Key;