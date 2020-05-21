![Node.js CI](https://github.com/Livshitz/concurrency.libx.js/workflows/Node.js%20CI/badge.svg)

# 💄 concurrency.libx.js
> Create promises as an object to manually wrap non-promisified functions and avoid callback-hell.
  
While `util.promisify` is useful to convert callback-based functions to promisibable functions, `concurrency.libx.js` is useful to manually manage `resolve` and `reject` operations.
   
Instead:
```javascript:
const util = require('util');
const fs = require('fs');
const stat = util.promisify(fs.stat);

stat('.').then((stats) => {
  // Do something with `stats`
}).catch((error) => {
  // Handle the error.
});

// or
async function callStat() {
  const stats = await stat('.');
  console.log(`This directory is owned by ${stats.uid}`);
}
```

Do: 
```javascript:
const fs = require('fs');
const { Deferred } = require('concurrency.libx.js');
const p = Deferred.new();

fs.stat('.', (err, value)=> {
  if (err) return p.reject(err);
  p.resolve(value);
})

const stat = await p;
```
  
This approach allows easier to turn deep callback-based functions, spagetti or legacy code, into more modern promisiable code with fewer changes.

`concurrency.libx.js` is also browser friendly and supports node versions before 8.

## Develop:

### Build:
> ``` $ yarn build ```

### Watch & Build:
> ``` $ yarn watch ```

### Run tests:
> ``` $ yarn test ```

## Usage:
Check more examples at [tests](tests/Deferred.test.ts).

