const _ = require('lodash');
const arr = _.chunk(['a', 'b', 'c', 'd'], 2);
console.log("arra", arr);
const a1 = _.compact([3,4,5, 0,6, null, undefined, false, 8])
console.log(a1);
const a2 = _.concat([3], 4, 5, [[7]])
console.log(a2);
console.log(_.mean([2, 1.111111]));

var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 1 }
];
 

var youngest = _
  .chain(users)
  .sortBy('age')
  .map(function(o) {
    return o.user + ' is ' + o.age;
  })
  .head()
  .value();
// => 'pebbles is 1'

console.log(youngest);