import Deferred from './Deferred';
import async from './async';

const waitUntil = async (conditionFn, callback = null, interval = 10, timeout = 5000) => {
    var expiry = new Date();
    expiry.setMilliseconds(expiry.getMilliseconds() + timeout);

    var wrapper = async(conditionFn);

    let p = Deferred.new();

    // Check before waiting
    if (await wrapper()) {
        let ret = callback ? callback() : null;
        return p.resolve(ret);
    }

    // Wait and check again
    var i = setInterval(async () => {
        if (new Date() > expiry) {
            clearInterval(i);
            return p.reject();
        }
        if (await wrapper()) {
            clearInterval(i);
            let ret = callback ? callback() : null;
            return p.resolve(ret);
        }
    }, interval);

    return p;
};


export default waitUntil;