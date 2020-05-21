import Deferred from './Deferred';

const delay = async (milliseconds) => {
    let p = Deferred.new();
    setTimeout(()=>p.resolve(), milliseconds);
    return p;
}

export default delay;