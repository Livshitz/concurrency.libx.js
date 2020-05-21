import Deferred from './Deferred';
import isAsync from './isAsync';

const async = function<T> (func: Function): (...args: any[])=>Promise<T> {
    if (isAsync(func)) return func as any;

    let promise = Deferred.new();
    let wrapper = async function () : Promise<T> {
        let args = arguments;
        try {
            let result = func.apply(func, args);
            promise.resolve(result);
            return result;
        } catch(ex) {
            promise.reject(ex);
            return null;
        }
    }
    return wrapper;
}

export default async;