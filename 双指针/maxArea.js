/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let leftIndex = 0;
  let rightIndex = height.length - 1;
  let max = 0;
  while (leftIndex < rightIndex) {
    const area = Math.min(height[leftIndex], height[rightIndex]) * (rightIndex - leftIndex);
    if (area > max) {
      max = area
    } else {
      if (height[leftIndex] < height[rightIndex]) {
        leftIndex++
      } else {
        rightIndex--
      }
    }
  }
  return max
};

// 时间复杂度：O(n)
// 空间复杂度：O(1)
