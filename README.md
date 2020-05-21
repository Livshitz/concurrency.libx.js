![Node.js CI](https://github.com/Livshitz/concurrency.libx.js/workflows/Node.js%20CI/badge.svg)

# ᭟ concurrency.libx.js
> Helper functions to deal better with multicuncurrency, parallelism and promises.


##### Helpers:  
-[Deferred](#Deferred)  
-[Async](#Async)  
-[IsAsync](#IsAsync)  
-[Debounce](#Debounce)  
-[Throttle](#Throttle)  
-[Chain](#Chain)  
-[Delay](#Delay)  
-[Sleep](#Sleep)  
-[Measurements](#Measurements)  
-[WaitUntil](#WaitUntil)  


-----
## Deferred:
Create promises as an object to manually wrap non-promisified functions and avoid callback-hell.
	
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
	

## Async:
Dynamically make a sync function async and return a promise. It'll wrap your function with a promise and will allow you treat synchronous functions as asyncs, dynamically.

```javascript:
let syncFunc = (arg) => { // synchronous function
	counter = arg;
	return 10;
}
let result = await async(syncFunc); // call it as if it was asynchrounous
```

## IsAsync:
Determin dynamically if a given function is async or not.

```javascript:
isAsync((x)=>x=1); // false
isAsync(async (x)=>x=1); // true
```

## Debounce:
Make a function that is expected to be called multiple times, to be spread with even intervals. Does not skip any call, just delays them.

```javascript:
let func = debounce(()=>{
	setInterval(()=>console.log('x'), 10);
}, 100;
func(); // Will make the function to be called with 100ms between each call.
```

## Throttle:
Make a function that is expected to be called multiple times, to be called only once in a given interval. Will skip calls in between.

```javascript:
let func = throttle(()=>{
	setInterval(()=>console.log('x'), 10);
}, 20, true);
func(); // The function will be called only once per 20ms, each time one call will be ignored.
```

## Chain:
Perform a given array of async functions in a sequence.

```javascript:
let tasks = [async ()=>console.log(1), async ()=>console.log(2)];
await chain.chainTasks(tasks);
```

## Delay:
Let the JS VM continue treating other stuff and get back to your block after period passed.   
Same as setting `setTimeout(fun, dur)` but with avoiding the callback-hell;

```javascript:
console.log('before');
await delay(100);
console.log('after 100ms');
```

## Sleep:
Basically the same as delay, just uses Promise object instead Deferred.

```javascript:
await sleep(100);
```

## Measurements:
Helper functions to measure execution times.

```javascript:
measurements.measure('test');
await delay(100);
let duration = measurements.getMeasure('test2');
let duration = measurements.measure('test');

```

## WaitUntil:
[TBD Description]

```javascript:
let condition = ()=> counter == 10;
let interval = 10; // How often to run the condition check
await waitUntil(condition, ()=> {
	console.log('condition reached!');
}, interval);
```
	

----

## Develop:

### Build:
> ``` $ yarn build ```

### Watch & Build:
> ``` $ yarn watch ```

### Run tests:
> ``` $ yarn test ```

## Usage:
Check more examples at [tests](tests/).

