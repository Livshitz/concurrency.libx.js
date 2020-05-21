import waitUntil from '../src/waitUntil';

test('helpers.waitUntil-positive', async () => {
	let counter = 0;
	let interval = setInterval(()=>counter++, 10);
	await waitUntil(()=>{
		return counter == 10;
	}, ()=> {
		clearInterval(interval);
	}, 10);
	expect(counter).toBeLessThanOrEqual(11);
});

test('helpers.waitUntil-negative', async () => {
	let counter = 0;
	let interval = setInterval(()=>counter++, 10);
	await waitUntil(()=>counter == 10, ()=> {
		clearInterval(interval);
	}, 10, 50)
	.catch(()=>{ // expect period to pass
		expect(counter).toBeLessThanOrEqual(6);
	});
});
