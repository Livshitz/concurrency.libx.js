const isAsync = function (func) {
    const string = func.toString().trim();

    return !!(
        // native
        string.match(/^async /) ||
        // babel (this may change, but hey...)
        string.match(/return _ref[^\.]*\.apply/) ||
        // insert your other dirty transpiler check
        string.match(/__awaiter/)
        // there are other more complex situations that maybe require you to check the return line for a *promise*
    );
}

export default isAsync;