import async from '../src/async';

test('async-positive', async () => {
	let counter = 0
	let syncFunc = (arg)=>{
		counter = arg;
		return 10;
	}
	let asyncFunc = async(syncFunc);
	let res = await asyncFunc(1);
	expect(counter).toEqual(1);
	expect(res).toEqual(10);
});
