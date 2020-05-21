import debounce from '../src/debounce';
import Deferred from '../src/Deferred';

test('debounce-positive', async () => {
	let track = [];
	let counter = 0;
	let debounceMS = 50;
	let func = debounce(()=>{
		track.push(counter++)
	}, debounceMS);
	let tickEachMs = 10;
	let ticksToCount = 10;
	let interval = setInterval(func, tickEachMs);
	let p = Deferred.new();
	setTimeout(()=>{ // stop after a while
		clearInterval(interval); // stop ticking

		setTimeout(()=>{ // let debounce period pass and expect 1 call
			p.resolve();
		}, debounceMS);
	}, tickEachMs * ticksToCount)

	await p;
	expect(track.length).toEqual(1);
});