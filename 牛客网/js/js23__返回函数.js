
function functionFunction(str){
    return function(str2){
        return str + ', '+str2
    }
}
functionFunction('Hello')('world')