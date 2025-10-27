/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let l = 0, r = matrix.length - 1;
  let t = 0;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (matrix[mid][0] <= target && matrix[mid][matrix[mid].length - 1] >= target) {
      t = mid;
      break;
    } else if (matrix[mid][0] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  if (l > r) return false;

  let left = 0, right = matrix[t].length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (matrix[t][mid] === target) {
      return true;
    } else if (matrix[t][mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
};