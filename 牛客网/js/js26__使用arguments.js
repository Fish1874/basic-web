function useArguments() {
    let a = 0;
    [...arguments].forEach(element => {
        a += element;
    })
    return a
}