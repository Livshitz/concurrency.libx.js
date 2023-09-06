import Deferred from "./Deferred";

interface ICallbackResult<T = unknown> {
    result: T;
    promise: Promise<T>;
    counter: number;
}

export const concurrent = async (promises: Promise<unknown>[], eachCb?: (result: ICallbackResult)=>void) => {
    const p = new Deferred();
    var counter = 0;

    for(var i=0; i<promises.length; i++) {
        var t = promises[i];
        await t.then((...args)=> {
            if (eachCb) eachCb.call(this, { result: args, promise: t, counter });
            counter++;
        });
    }
    await Promise.all(promises);
    p.resolve(counter);

    return p;
}