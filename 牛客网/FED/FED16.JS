function indexOf(arr, item) {
  let a = -1;
  for (const key in arr) {
    if (arr[key] === item) {
      a = key;
    }
  };
  return a;
}
indexOf([1, 2, 3, 4], 3);