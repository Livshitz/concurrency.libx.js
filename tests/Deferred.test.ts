import helpers from './_helpers';
import { Deferred } from '../src';

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

	let dur = await helpers.measure(async ()=>{
		setTimeout(()=>{
			p.resolve(true);
		}, 100);
		res = await p;
	}, 'setTimeout');
	expect(res).toBe(true);
	expect(dur).toBeLessThanOrEqual(150);
});

test('deferred-inNonAsync', () => {
	const d = new Deferred();
	let x = 0;
	let asyncFunc = (async ()=>{
		setTimeout(()=>{
			x = 1;
			d.resolve();
		}, 100);
		await d;
		expect(x).toBe(1);
	})();
});
