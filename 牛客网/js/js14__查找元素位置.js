function findAllOccurrences(arr, target) {
    let a = [];
    for (const [index, key] of arr.entries()) {
        if(key === target) {
            a.push(index);
        }
    }
    return a;
}

findAllOccurrences(['a','b','c','d','e','f','a','b','c'], 'a')