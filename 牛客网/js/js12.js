function duplicates(arr) {
    let res = [];
    for(let j = 0; j < arr.length; j++) {
        for(let i = j+1; i < arr.length; i++) {
            if(arr[j] === arr[i]) {
                res.push(arr[i])
            }
        }    
    }
    return [...new Set(res)];
}
duplicates([1, 2, 4, 4, 3, 3, 1, 5, 3])