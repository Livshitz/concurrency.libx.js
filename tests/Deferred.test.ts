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

test('deferred-onProgress callback', async done => {
	const d = Deferred.new<number, Error, number>();
	let progressEvents: number[] = [];

	d.onProgress((progress) => {
		progressEvents.push(progress);
		if (progress === 2) {
			d.resolve(42);
		}
	});
	d.reportProgress(1);
	setTimeout(() => d.reportProgress(2), 10);
	d.promise().then(result => {
		expect(result).toBe(42);
		expect(progressEvents).toEqual([1,2]);
		done();
	});
});

test('deferred async iterator for progress', async () => {
	const d = Deferred.new<number, Error, string>();
	const received: string[] = [];
	setTimeout(() => d.reportProgress('a'), 10);
	setTimeout(() => d.reportProgress('b'), 20);
	setTimeout(() => d.resolve(123), 30);

	for await (const progress of d) {
		received.push(progress);
	}
	// After resolve, iterator should end
	expect(received).toEqual(['a', 'b']);
});
