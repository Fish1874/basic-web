function sum(arr) {
  return arr.reduce((prev, cur) => {
    return prev += cur
  }, 0)
};
console.log(sum([1, 2, 3, 4]));