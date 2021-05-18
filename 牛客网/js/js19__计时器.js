function count(start, end) {
    console.log(start++);
    let timer = setInterval(function (){
        if (start <= end) {
            console.log(start++);
        } else {
            clearInterval(timer);
        }
    }, 100)
    return {
        cancel() {
           clearInterval(timer);
        }
    }
}