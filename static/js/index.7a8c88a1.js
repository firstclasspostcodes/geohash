(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"./docs/index.mdx":function(e,t,n){"use strict";n.r(t);var a=n("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),s=(n("./node_modules/react/index.js"),n("./node_modules/@mdx-js/react/dist/index.es.js")),o=n("./node_modules/react-runkit/dist/react-runkit.js"),i=n.n(o),r="\nconst { BoundingBox } = require('@firstclasspostcodes/geohash');\n\nconst center = { latitude: 48.97415, longitude: -13.94988 };\n\n// ~50km due east\nconst location = { latitude: 49.0009, longitude: -13.333 };\n\n// create a bounding box with a radius 50km\nconst box = new BoundingBox(center.latitude, center.longitude, 50 * 1000);\n\nbox.contains(location.latitude, location.longitude);\n",c="\nconst { BoundingBox } = require('@firstclasspostcodes/geohash');\n\nconst center = { latitude: 48.97415, longitude: -13.94988 };\n\n// create a bounding box with a radius 50km\nconst box = new BoundingBox(center.latitude, center.longitude, 50 * 1000);\n\nconst ranges = box.hashRanges(7);\n\nranges[0];\n",b="\nconst { Key } = require('@firstclasspostcodes/geohash');\n\nconst center = { latitude: 48.97415, longitude: -13.94988 };\n\n// create our hash key\nconst key = Key.fromDegrees(center);\n\n// set a key length (7 is best for 1km);\nconst keyLength = 7;\n\nkey.toKeyObject(keyLength);\n",d="\nconst { Query } = require('@firstclasspostcodes/geohash');\nconst { DynamoDB } = require('aws-sdk');\n\nconst docClient = new DynamoDB.DocumentClient({\n  service: new DynamoDB({ region: process.env.AWS_REGION }),\n  params: {\n    TableName: process.env.MY_TABLE,\n    IndexName: process.env.POINT_INDEX_NAME,\n  },\n});\n\nconst center = { latitude: 48.97415, longitude: -13.94988 };\n\nconst query = new Query(docClient);\n\n// find matching points up to 50km away\nawait query.find(center, 50 * 1000);\n";n.d(t,"default",function(){return h});var p={},l="wrapper";function h(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(s.b)(l,Object.assign({},p,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("h1",{id:"geohash"},"Geohash"),Object(s.b)("p",null,Object(s.b)("a",Object.assign({parentName:"p"},{href:"https://www.npmjs.com/package/@firstclasspostcodes/geohash"}),Object(s.b)("img",Object.assign({parentName:"a"},{src:"https://img.shields.io/npm/v/geohash.svg",alt:"NPM"})))," ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"https://standardjs.com"}),Object(s.b)("img",Object.assign({parentName:"a"},{src:"https://img.shields.io/badge/code_style-standard-brightgreen.svg",alt:"JavaScript Style Guide"})))," ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"https://travis-ci.org/firstclasspostcodes/geohash"}),Object(s.b)("img",Object.assign({parentName:"a"},{src:"https://travis-ci.org/firstclasspostcodes/geohash.svg?branch=master",alt:"Build Status"})))," ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"https://greenkeeper.io/"}),Object(s.b)("img",Object.assign({parentName:"a"},{src:"https://badges.greenkeeper.io/firstclasspostcodes/geohash.svg",alt:"Greenkeeper badge"})))," ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"https://codecov.io/gh/firstclasspostcodes/geohash"}),Object(s.b)("img",Object.assign({parentName:"a"},{src:"https://codecov.io/gh/firstclasspostcodes/geohash/branch/master/graph/badge.svg",alt:"codecov"})))),Object(s.b)("p",null,"At Firstclasspostcodes, we use geohashes inside DynamoDB to quickly retrieve matching postcodes for a particular coordinate. Our solution has been adapted from ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"https://aws.amazon.com/blogs/mobile/geo-library-for-amazon-dynamodb-part-1-table-structure/"}),"this original blog post")," and we've extracted some of the code from an ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"https://github.com/rh389/dynamodb-geo.js"}),"existing NPM library")," to suit our own purposes."),Object(s.b)("h2",{id:"install"},"Install"),Object(s.b)("pre",null,Object(s.b)("code",Object.assign({parentName:"pre"},{}),"npm i @firstclasspostcodes/geohash --save\n")),Object(s.b)("h2",{id:"key"},"Key"),Object(s.b)("p",null,"We can construct a hash key with the following:"),Object(s.b)(i.a,{source:b,nodeVersion:"11",mdxType:"Embed"}),Object(s.b)("p",null,"This products an object consisting of a ",Object(s.b)("em",{parentName:"p"},'"hash key"'),"  (",Object(s.b)("inlineCode",{parentName:"p"},"geokey"),") and ",Object(s.b)("em",{parentName:"p"},'"hash range"')," (",Object(s.b)("inlineCode",{parentName:"p"},"georange"),"). This is enough to start storing points, ready for querying within DynamoDB!"),Object(s.b)("hr",null),Object(s.b)("h2",{id:"boundingbox"},"BoundingBox"),Object(s.b)("p",null,"Let's start testing bounding boxes by determining if a specific point is contained within the matching area of another point. A bounding box is used to produce all the matching geohash ranges for querying points within DynamoDB (or another client)."),Object(s.b)(i.a,{source:r,nodeVersion:"11",mdxType:"Embed"}),Object(s.b)("p",null,"Once a bounding box for a particular center has been constructed, its possible to produce the hash ranges (at a configurable key length) that can be marshalled into requests."),Object(s.b)(i.a,{source:c,nodeVersion:"11",mdxType:"Embed"}),Object(s.b)("p",null,'The length of the "hash key" to adopt depends on the data and types of queries you need to work with. Refer to ',Object(s.b)("a",Object.assign({parentName:"p"},{href:"https://aws.amazon.com/blogs/mobile/geo-library-for-amazon-dynamodb-part-1-table-structure/"}),"this blog post")," for more information."),Object(s.b)("hr",null),Object(s.b)("h2",{id:"query"},"Query"),Object(s.b)("p",null,"Querying for matching points is relatively trivial, but only supports DynamoDB currently. It uses an instance of ",Object(s.b)("inlineCode",{parentName:"p"},"AWS.DynamoDB.DocumentClient")," to execute all the necessary queries (a query for each tuple returned from ",Object(s.b)("inlineCode",{parentName:"p"},"BoundingBox#hashRanges"),"). "),Object(s.b)("p",null,"Lets take a look at an example below, which provides a pre-configured instance of ",Object(s.b)("inlineCode",{parentName:"p"},"DocumentClient"),"."),Object(s.b)(i.a,{source:d,nodeVersion:"11",mdxType:"Embed"}),Object(s.b)("p",null,"The ",Object(s.b)("inlineCode",{parentName:"p"},"docClient")," is configured to send the ",Object(s.b)("inlineCode",{parentName:"p"},"TableName")," and ",Object(s.b)("inlineCode",{parentName:"p"},"IndexName")," along with every ",Object(s.b)("inlineCode",{parentName:"p"},"#query")," request."))}h&&h===Object(h)&&Object.isExtensible(h)&&Object.defineProperty(h,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"docs/index.mdx"}}),h.isMDXComponent=!0}}]);
//# sourceMappingURL=index.6a15da387b307168816c.js.map