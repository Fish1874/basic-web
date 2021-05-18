function truncate(arr) {
  let a = arr.filter((item, index, arr1) => {
    return index != arr1.length - 1;
  });
  console.log(a)
  return a;
}

truncate([1, 2, 3, 4]);