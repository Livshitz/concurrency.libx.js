const measure = async (fn: ()=>Promise<any>, name='') => {
	let t0 = performance.now();
	let res = null;
	let duration = 0;
	try {
		res = await fn();
	} catch (ex) {
		return ex;
	} finally {
		duration = performance.now() - t0;
		console.log(`⏱	'${name}' took ${duration.toFixed(2)}ms`);
	}
	return duration; //res;
}

export default {
    measure,
}