![Node.js CI](https://github.com/Livshitz/promisify.libx.js/workflows/Node.js%20CI/badge.svg)

# 💄 Promisify.libx.js
> Create promises as an object to manually wrapper for non-promisified functions.
  
While `util.promisify` is useful to convert callback-based functions to promisibable functions, `promisify.libx.js` is useful to manually manage `resolve` and `reject` operations.
   
Instead:
```javascript:
const stat = util.promisify(fs.stat);

stat('.').then((stats) => {
  // Do something with `stats`
}).catch((error) => {
  // Handle the error.
});
```

Do: 
```javascript:
const Promisify = require('promisify.libx.js');
const p = Promisify.new();

fs.stat('.').then(stats=>{
  p.resolve(stats);
}).catch(error => {
  p.reject(error);
});

const stat = await p;
```
  
This approach allows easier to turn deep callback-based functions, spagetti or legacy code, into more modern promisiable code with fewer changes.

## Develop:

### Build:
> ``` $ yarn build ```

### Watch & Build:
> ``` $ yarn watch ```

### Run tests:
> ``` $ yarn test ```

## Usage:
Check [tests](tests/promisify.test.ts).

