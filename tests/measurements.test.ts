import * as measurements from '../src/measurements';
import delay from '../src/delay';


test('helpers.measure-positive', async () => {
	measurements.measure('test');
	await delay(100);
	let output = measurements.measure('test');
	await delay(100);
	expect(output).toBeLessThanOrEqual(150);
	output = measurements.measure('test');
	expect(output).toBeLessThanOrEqual(250);
});

test('helpers.getMeasure-positive', async () => {
	measurements.measure('test2');
	await delay(100);
	let output = measurements.getMeasure('test2');
	expect(output).toBeLessThanOrEqual(120);
});
