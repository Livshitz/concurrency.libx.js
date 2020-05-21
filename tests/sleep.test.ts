import sleep from '../src/sleep';

test('helpers.sleep-positive', async () => {
	let start = new Date();
	let output = await sleep(100);
	let end = new Date();
	expect(end.getTime() - start.getTime()).toBeLessThanOrEqual(200);
});