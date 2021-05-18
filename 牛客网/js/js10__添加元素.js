function insert(arr, item, index) {
    let arr1 = [...arr];
    arr1.splice(index,0,item)
    return arr1
}
insert([1, 2, 3, 4], 'z', 2)