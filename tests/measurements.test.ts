import * as measurements from '../src/measurements';
import delay from '../src/delay';


test('helpers.measure-positive', async () => {
	measurements.startMeasure('test');
	await delay(100);
	let output = measurements.startMeasure('test');
	await delay(100);
	expect(output).toBeLessThanOrEqual(150);
	output = measurements.startMeasure('test');
	expect(output).toBeLessThanOrEqual(250);
});

test('helpers.getMeasure-positive', async () => {
	measurements.startMeasure('test2');
	await delay(100);
	let output = measurements.peekMeasure('test2');
	expect(output).toBeLessThanOrEqual(120);
});
