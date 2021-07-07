function curryIt(fn) {
    var length = fn.length,
        args = [];
    var result = function (arg) {
        args.push(arg);
        length--;
        if (length <= 0) {
            return fn.apply(this, args) ;
        } else {
            return result;
        }
    }
    return result;
}