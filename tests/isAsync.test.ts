import isAsync from '../src/isAsync';

test('helpers.isAsync-positive', () => {
	let param = async ()=>true;
	let output = isAsync(param);
	expect(output).toEqual(true);
});
test('helpers.isAsync-negative', () => {
	let param = ()=>true;
	let output = isAsync(param);
	expect(output).toEqual(false);
});