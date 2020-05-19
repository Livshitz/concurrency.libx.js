import Promisify from '../src/Promisify';

const newPromise = () => {
    var promise = new Promisify();
    return promise;
}

beforeAll(()=> {
})

test('newPromise-positive', () => {
	let p = Promisify.new();
	p.resolve(true);
	expect(p).resolves.toEqual(true);
});
