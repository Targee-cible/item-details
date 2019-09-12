# Bullseye - Item Details Service

Bullseye is a clone of a Target Item Page. This service (item details) is for the item details module within that. This module includes:

> -A Fit & Details section

> -A Sizing Chart section

> -A Shipping Details section

> -A Q&A section

> -A "What's GiftNow?" section

## Related Projects

  - https://github.com/hrr40-fec1/item-checkout
  - https://github.com/hrr40-fec1/item-reviews
  - https://github.com/hrr40-fec1/item-details
  - https://github.com/hrr40-fec1/Images

## Table of Contents

1. [Requirements](#requirements)
2. [Development](#development)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- MongoDB 4.2

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Creating bundle.js File

From within the root directory:

```sh
npm run react-dev
```

### Seeding the Database

From within the root directory:

```sh
npm run seed
```
### API Requests

retrieves item details for specific itemId <br />
GET Request `/api/items/:itemId` <br />
Example Response:
```sh
[ { type: 'Men - Shirts',
    _id: 5d781fa1ad972754f0377fdb,
    itemId: 12,
    fitAndStylePointOne: 'Voluptas qui harum id quia omnis rerum facilis culpa.',
    fitAndStylePointTwo: 'Ab temporibus esse voluptas quos quod voluptatem quia consectetur facere.',
    fitAndStylePointThree: 'Ut perferendis praesentium incidunt voluptate eum dignissimos est.',
    fitAndStylePointFour: null,
    fitAndStylePointFive: null,
    fitAndStyleBlurb: 'Accusamus nobis officiis voluptates illo labore neque neque. Consequuntur itaque rem expedita ea beatae accusamus quia facere expedita. Rem tempora praesentium quis ut vel corrupti quia. Ea necessitatibus natus.',
    sizing: 'Granite',
    material: 'Rubber',
    fit: 'Practical',
    length: 'Games cyan',
    features: 'Generic',
    neckline: 'Incredible',
    itemStyle: 'Tasty',
    garmentCuffCutType: 'connecting Buckinghamshire',
    garmentSleeveStyle: 'Georgia Investment Account',
    careAndCleaning: 'Small Soft Tuna Total',
    TCIN: 30931,
    UPC: 21173,
    DPCI: 59176,
    origin: 'Supervisor',
    recycledPolyester: true,
    fastShipping: false,
    estimatedShipDimensions: 'Omnis magnam aut omnis deleniti ut pariatur quidem.',
    estimatedShipWeight: 'Functionality Persistent Optimization',
    __v: 0 } ]
```

retrieves item details for specific itemId <br />
GET Request `/api/questions/:itemId` <br />
Example Response:
```sh
[ { _id: 5d781fa1ad972754f0378092,
    itemId: 12,
    question: 'Voluptas aut magni.',
    asker: 'Patsy',
    dateAsked: 2019-03-16T01:39:34.727Z,
    answer: 'Et dolores ea dolorem tempore quam ut nulla omnis tempore.',
    nameOfResponder: 'Devon',
    dateAnswered: 2019-07-17T17:39:47.711Z,
    helpfulCount: 2,
    unhelpfulCount: 3,
    teamMember: false,
    __v: 0 },
  { _id: 5d781fa2ad972754f03780db,
    itemId: 12,
    question: 'Provident enim enim.',
    asker: 'Winnifred',
    dateAsked: 2019-06-22T09:48:33.668Z,
    answer: null,
    nameOfResponder: null,
    dateAnswered: null,
    helpfulCount: null,
    unhelpfulCount: null,
    teamMember: null,
    __v: 0 } ]
```

retrieves item details for specific itemId <br />
GET Request `/api/sizing/:itemId` <br />
Example Response:
```sh
[ { type: 'Men - Shirts',
    _id: 5d781fa2ad972754f03780fc,
    size: 'XS',
    neck: '13-13.5',
    chest: '30-32',
    sleeve: '31.5-32',
    __v: 0 },
  { type: 'Men - Shirts',
    _id: 5d781fa2ad972754f03780fd,
    size: 'S',
    neck: '14-14.5',
    chest: '34-36',
    sleeve: '32.5-33',
    __v: 0 },
  { type: 'Men - Shirts',
    _id: 5d781fa2ad972754f03780fe,
    size: 'M',
    neck: '15-15.5',
    chest: '38-40',
    sleeve: '33.5-34',
    __v: 0 },
  { type: 'Men - Shirts',
    _id: 5d781fa2ad972754f03780ff,
    size: 'L',
    neck: '16-16.5',
    chest: '42-44',
    sleeve: '34.5-35',
    __v: 0 },
  { type: 'Men - Shirts',
    _id: 5d781fa2ad972754f0378100,
    size: 'XL',
    neck: '17-17.5',
    chest: '46-48',
    sleeve: '35.5-36',
    __v: 0 },
  { type: 'Men - Shirts',
    _id: 5d781fa2ad972754f0378101,
    size: 'XXL',
    neck: '18-18.5',
    chest: '50-52',
    sleeve: '36.5-37',
    __v: 0 },
  { type: 'Men - Shirts',
    _id: 5d781fa2ad972754f0378102,
    size: 'XXXL',
    neck: '19-19.5',
    chest: '54-56',
    sleeve: '37.5-38',
    __v: 0 } ]
```
creates a new question for a specific item id <br />
POST Request `/api/createQ` <br />

updates an item detail based on item id <br />
PUT Request `/api/update` <br />

deletes an item based on itemId <br />
DELETE Request `/api/delete/:itemId` <br />


