import { concurrent } from '../src/concurrent';
import delay from '../src/delay';

test('helpers.concurrent-positive', async () => {
	let counter = 0;
	const f1 = async ()=>counter=1;
	const f2 = async ()=>{ 
		await delay(20);
		counter=2; 
		return { a:1, b:2 } 
	};
	const f3 = async ()=>counter=3;
	
	const f2p = f2();
	let promises = [f1(), f2p];

	await delay(10).then(()=>{
		const f3p = f3();
		promises.push(f3p);
	});

	f2p.then((res)=>{
		console.log('f2 completed and resulted with: ', res);
	});
	
	const res = await concurrent(promises, (taskRes)=> {
		console.log('task done: ', taskRes);
		if (taskRes.promise == f2p) {
			console.log('f2p was completed!', taskRes);
		}
	});
	console.log('res: ', res);
	expect(counter).toEqual(2);
});