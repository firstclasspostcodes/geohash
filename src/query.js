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

const BoundingBox = require('./boundingBox');
const Long = require('long');

class Query {
  constructor(docClient, options = {}) {
    if (typeof docClient.query !== 'function') {
      throw new Error(`Expected client ("${docClient}") to respond to #query()`);
    }
    this.options = Object.assign({},  Query.defaultOptions, options);
    this.docClient = docClient;
  }

  async find({ latitude, longitude }, radius = 1000) {
    const { locationKey } = this.options;
    const box = new BoundingBox(latitude, longitude, radius);
    const optimized = this.optimizeRanges(box.hashRanges());
    const queries = this.keyConditionExpressions(optimized);
    const matches = await this.executeQueries(queries);
    return matches.filter(match => (
      box.contains(match[locationKey.latitude], match[locationKey.longitude])
    ));
  }

  async executeQueries(queries) {
    const responses = await Promise.all(queries.map(query => this.paginate(query)));
    return [].concat(...responses);
  }

  async paginate(query) {
    const { docClient } = this;
    const { Items: items = [], LastEvaluatedKey } = await docClient.query(query).promise();
    if (LastEvaluatedKey) {
      const params = { ...query, ExclusiveStartKey: LastEvaluatedKey };
      return items.concat(await this.paginate(params));
    }
    return items;
  };

  optimizeRanges(ranges) {
    const optimized = {};
    ranges.forEach(({ min, max, key }) => {
      const { [key]: curr } = optimized;
      if (!curr) {
        return optimized[key] = { min, max, key };
      }
      curr.min = Long.fromString(curr.min).gt(min) ? min : curr.min;
      curr.max = Long.fromString(curr.max).lt(max) ? max : curr.max;
    });
    return Object.keys(optimized).map(key => optimized[key]);
  }

  keyConditionExpressions(ranges) {
    const { indexKey } = this.options;
    return ranges.map(({ min, max, key }) => ({
      KeyConditionExpression: '#hkey = :key and #rkey between :min and :max',
      ExpressionAttributeValues: {
        ':key': key,
        ':min': min,
        ':max': max,
      },
      ExpressionAttributeNames: {
        '#hkey': indexKey.hash,
        '#rkey': indexKey.range,
      },
    }));
  }
}

Query.defaultOptions = {
  indexKey: {
    hash: 'geokey',
    range: 'georange',
  },
  locationKey: {
    latitude: 'latitude',
    longitude: 'longitude',
  },
};

module.exports = Query;