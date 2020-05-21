import throttle from '../src/throttle';
import Deferred from '../src/Deferred';

test('helpers.throttle-positive', async () => {
	let track = [];
	let counter = 0;
	let throttleMS = 50;
	let func = throttle(()=>{
		track.push(counter++)
	}, throttleMS, true);
	let tickEachMs = 10;
	let ticksToCount = 10;
	let interval = setInterval(func, tickEachMs);
	let p = Deferred.new();
	setTimeout(()=>{ // stop after a while
		clearInterval(interval); // stop ticking
		p.resolve(tickEachMs * ticksToCount / throttleMS); // expect calls to be interval / throttle
	}, tickEachMs * ticksToCount)

	let expected = await p;
	expect(track.length).toBeGreaterThanOrEqual(expected-1);
	expect(track.length).toBeLessThan(expected+1);
	expect(track.length).toEqual(counter);
});