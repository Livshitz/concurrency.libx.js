import delay from '../src/delay';
import Deferred from '../src/Deferred';

test('helpers.delay-positive', async () => {
	let p2 = Deferred.new();
	p2.reject();
	p2.catch(()=>{
		console.log('p2')
	})
	let start = new Date();
	let p = delay(100);
	await p;
	let end = new Date();
	expect(end.getTime()-start.getTime()).toBeLessThanOrEqual(150);
});