
function partial(fn, str1, str2) {
  let result = function (str3) {
    return fn(str1, str2, str3)
  }
  return result;
}