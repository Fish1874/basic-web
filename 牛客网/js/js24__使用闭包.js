function makeClosures(arr, fn) {
    let result = new Array();
    for(let i=0;i<arr.length;i++){
        result[i] = function(){
            return fn(arr[i]);
        };
    }
    return result;
}