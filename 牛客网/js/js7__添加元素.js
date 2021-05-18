function prepend(arr, item) {
    let a = [item,...arr];
    return a;
}
prepend([1, 2, 3, 4], 10);