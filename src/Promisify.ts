import Deferred from './Deferred';

class Promisify<Tvalue, Treason> extends Deferred<Tvalue, Treason> {
	constructor() {
		super();
	}

	static new() {
		return new Deferred();
	}
}

export default Promisify;
