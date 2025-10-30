/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const n = heights.length;
  const stack = []; // 存储索引的单调栈

  let maxArea = 0;

};

// 示例用法
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleArea([2, 4])); // 4