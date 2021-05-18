function remove(arr, item) {
    let a = arr.filter((v,i) => {
        return v!=item;
    })  
    console.log(a)
    return a;
}
remove([1, 2, 3, 4, 2], 2)