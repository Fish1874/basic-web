function count(arr, item) {
    return arr.reduce((pre,cur) => {
        return pre += cur == item ? 1:0
    },0)
}
count([1, 2, 4, 4, 3, 4, 3], 4)