import * as chain from '../src/chain';

test('helpers.chainTasks-positive', async () => {
	let counter = 0
	let tasks = [async ()=>counter=1, async ()=>counter=2];
	await chain.chainTasks(tasks);
	expect(counter).toEqual(2);
});