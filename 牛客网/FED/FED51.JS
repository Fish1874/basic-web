/* 小数相乘法 */
function multiply(a, b) {
  let len1 = a.toString().includes('.') ? a.toString().split('.')[1].length : 0;
  let len2 = b.toString().includes('.') ? b.toString().split('.')[1].length : 0;
  let m = Math.max(len1, len2);
  let res = parseFloat(a * b).toFixed(m);
  return res;
}
console.log(multiply(3, 0.0001));

/* 小数相加 */
function addNum(num1, num2) {
  let sq1 = num1.toString().includes('.') ? num1.toString().split('.')[1].length : 0;
  let sq2 = num2.toString().includes('.') ? num2.toString().split('.')[1].length : 0;
  let m = Math.pow(10, Math.max(sq1, sq2));
  return (num1 * m + num2 * m) / m;
}

console.log(addNum(12.333, 1.231));