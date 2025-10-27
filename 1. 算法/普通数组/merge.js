/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (intervals.length <= 1) return intervals;
  const arr = [...intervals].sort((a, b) => a[0] - b[0]);
  let _arr = arr[0]
  const ans = [];
  for (let i = 1; i < arr.length; i++) {
    if (_arr[1] < arr[i][0]) {
      ans.push(_arr)
      if (i === arr.length - 1) {
        ans.push(arr[i])
      }
      _arr = arr[i]
    } else {
      _arr = [_arr[0], Math.max(_arr[1], arr[i][1])]
      if (i === arr.length - 1) {
        ans.push(_arr)
      }
    }
  }
  return ans;
};
// merge([[1, 3], [2, 6], [8, 10], [15, 18]])
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]))
console.log(merge([[1, 4], [4, 5]]))