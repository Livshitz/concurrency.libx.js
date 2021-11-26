
let _measures = {};

export const measure = async function<T=any>(fn: ()=>Promise<T>|T) {
    const start = new Date().getTime();
    await fn();
    const duration = new Date().getTime() - start;
    return duration;
}

export const startMeasure = function(measureName = '_') {
    if (_measures[measureName] != null) return peekMeasure(measureName);
    _measures[measureName] = new Date().getTime();
    return 0;
}

export const peekMeasure = function(measureName = '_') {
    if (_measures[measureName] == null) return 0;
    return new Date().getTime() - _measures[measureName];
}

export const getMeasureAndReset = function(measureName = '_') {
    let ret = peekMeasure(measureName);
    _measures[measureName] = null;
    return ret;
}
