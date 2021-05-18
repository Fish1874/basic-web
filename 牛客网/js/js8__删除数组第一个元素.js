function curtail(arr) {
    let arr1 = arr.filter((item,index) => {            
        return index != 0
    })
    return arr1
}
curtail([1, 2, 3, 4]);