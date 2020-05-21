
let _measures = {};

export const measure = function(measureName = '_') {
    if (_measures[measureName] != null) return getMeasure(measureName);
    _measures[measureName] = new Date().getTime();
    return 0;
}

export const getMeasure = function(measureName = '_') {
    if (_measures[measureName] == null) return 0;
    return new Date().getTime() - _measures[measureName];
}

export const getMeasureAndReset = function(measureName = '_') {
    let ret = getMeasure(measureName);
    _measures[measureName] = null;
    return ret;
}
