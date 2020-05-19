import Promisify from '../src/Promisify';

const newPromise = () => {
    var promise = new Promisify();
    return promise;
}

const measure = async (fn: ()=>Promise<any>, name='') => {
	let t0 = performance.now();
	let res = null;
	let duration = 0;
	try {
		res = await fn();
	} catch (ex) {
		return ex;
	} finally {
		duration = performance.now() - t0;
		console.log(`⏱	'${name}' took ${duration.toFixed(2)}ms`);
	}
	return duration; //res;
}

beforeAll(()=> {
})

test('newPromise-simple', () => {
	let p = Promisify.new();
	p.resolve(true);
	expect(p).resolves.toEqual(true);
});

test('newPromise-setTimeout', async () => {
	let p = Promisify.new();
	let res = null;

	let dur = await measure(async ()=>{
		setTimeout(()=>{
			p.resolve(true);
		}, 100);
		res = await p;
	}, 'setTimeout');
	expect(res).toBe(true);
	expect(dur).toBeLessThanOrEqual(150);
});
