/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Deferred
 * @typechecks
 * @flow
 */

/**
 * Deferred provides a Promise-like API that exposes methods to resolve and
 * reject the Promise. It is most useful when converting non-Promise code to use
 * Promises.
 *
 * If you want to export the Promise without exposing access to the resolve and
 * reject methods, you should export `getPromise` which returns a Promise with
 * the same semantics excluding those methods.
 *
 * Note: Requires ES2018+ for async iterator and Promise.finally support.
 */
class Deferred<Tvalue=any, Treason=any, TProgress=any> implements AsyncIterable<TProgress> {
	_settled: boolean;
	_promise: Promise<any>;
	_resolve: (value: Tvalue) => void;
	_reject: (reason: Treason) => void;

	// Progress support
	_progressHandlers: Array<(progress: TProgress) => void> = [];
	_progressQueue: TProgress[] = [];
	_progressResolvers: Array<(value: IteratorResult<TProgress>) => void> = [];
	_progressDone: boolean = false;

	constructor() {
		this._settled = false;
		this._promise = new Promise((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});
	}

	getPromise(): Promise<any> {
		return this._promise;
	}

	resolve(value?: Tvalue): void {
		this._settled = true;
		this._finishProgress();
		this._resolve(value);
	}

	reject(reason?: Treason): void {
		this._settled = true;
		this._finishProgress();
		this._reject(reason);
	}

	// Progress API
	onProgress(handler: (progress: TProgress) => void): void {
		this._progressHandlers.push(handler);
	}

	reportProgress(progress: TProgress): void {
		// Notify callbacks
		for (const handler of this._progressHandlers) {
			handler(progress);
		}
		// Notify async iterator
		if (this._progressResolvers.length) {
			this._progressResolvers.shift()!({ value: progress, done: false });
		} else {
			this._progressQueue.push(progress);
		}
	}

	private _finishProgress() {
		this._progressDone = true;
		while (this._progressResolvers.length) {
			this._progressResolvers.shift()!({ value: undefined, done: true });
		}
	}

	// Async iterator for progress events
	async *[Symbol.asyncIterator](): AsyncIterator<TProgress> {
		while (!this._progressDone || this._progressQueue.length) {
			if (this._progressQueue.length) {
				const value = this._progressQueue.shift();
				if (value !== undefined) yield value;
			} else if (this._progressDone) {
				break;
			} else {
				const value = await new Promise<TProgress>((resolve) => {
					this._progressResolvers.push(({ value }) => resolve(value as TProgress));
				});
				if (value !== undefined) yield value;
			}
		}
	}

	catch(onReject?: (error: any) => any): Promise<any> {
		return Promise.prototype.catch.apply(this._promise, arguments);
	}

	then(onFulfill?: (value: any) => any, onReject?: (error: any) => any): Promise<any> {
		return Promise.prototype.then.apply(this._promise, arguments);
	}

	// Note: Promise.finally requires ES2018 or later
	finally(onFinally?: (value:any) => void) {
		return Promise.prototype.finally.apply(this._promise, arguments);
	}

	get [Symbol.toStringTag]() {
		return this.promise.toString();
	}

	done(onFulfill?: (value: any) => any, onReject?: (error: any) => any): void {
		// Embed the polyfill for the non-standard Promise.prototype.done so that
		// users of the open source fbjs don't need a custom lib for Promise
		const promise = arguments.length ? this._promise.then.apply(this._promise, arguments) : this._promise;
		promise.then(undefined, function (err) {
			setTimeout(function () {
				throw err;
			}, 0);
		});
	}

	isSettled(): boolean {
		return this._settled;
	}

	promise(): Promise<any> {
		return this.getPromise();
	}

	static new<Tvalue=any, Treason=any, TProgress=any>() {
		return new Deferred<Tvalue, Treason, TProgress>();
	}
}

// module.exports = Deferred;
export default Deferred;