import { Deferred } from '../src';

const newPromise = () => {
    var promise = new Deferred();
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

test('deferred-simple', () => {
	let p = Deferred.new();
	p.resolve(true);
	expect(p).resolves.toEqual(true);
});

test('deferred-setTimeout', async () => {
	let p = Deferred.new();
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
