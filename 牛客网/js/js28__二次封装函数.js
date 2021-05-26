function partialUsingArguments(fn) {
    // 获取第一个参数之后的全部参数
    let filterFirstArgs = Array.prototype.slice.call(arguments, 1);
     
    let result = function() {
        // 通过concat合并两个或多个数据中的元素
        return fn.apply(this, filterFirstArgs.concat([].slice.call(arguments)));
    }
     
    return result;
}