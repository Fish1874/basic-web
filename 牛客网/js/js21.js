let fn = function (greeting, name, punctuation) {
    return greeting + ', ' + name + (punctuation || '!'); 
}
let arr = ['Hello', 'Ellie', '!']
function argsAsArray(fn, arr) {
    return  fn(...arr);
};