
# Geohash

> Transform geographic coordinates in the form of latitude and longitude into numerical geohashes.

[![NPM](https://img.shields.io/npm/v/geohash.svg)](https://www.npmjs.com/package/@firstclasspostcodes/geohash) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/firstclasspostcodes/geohash.svg?branch=master)](https://travis-ci.org/firstclasspostcodes/geohash) [![Greenkeeper badge](https://badges.greenkeeper.io/firstclasspostcodes/geohash.svg)](https://greenkeeper.io/) [![codecov](https://codecov.io/gh/firstclasspostcodes/geohash/branch/master/graph/badge.svg)](https://codecov.io/gh/firstclasspostcodes/geohash) [![Try geohash on RunKit](https://badge.runkitcdn.com/@firstclasspostcodes/geohash.svg)](https://npm.runkit.com/@firstclasspostcodes/geohash)

At Firstclasspostcodes, we use geohashes inside DynamoDB to quickly retrieve matching postcodes for a particular coordinate. Our solution has been adapted from [this original blog post](https://aws.amazon.com/blogs/mobile/geo-library-for-amazon-dynamodb-part-1-table-structure/) and we've extracted some of the code from an [existing NPM library](https://github.com/rh389/dynamodb-geo.js) to suit our own purposes.

## Getting Started

```
npm i @firstclasspostcodes/geohash --save
```

Then refer to the [documentation here](https://firstclasspostcodes.github.io/geohash) on how to start using it.

