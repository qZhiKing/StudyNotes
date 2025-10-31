/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  // 单调栈解法  O(n) 时间复杂度
  const n = heights.length;
  const stack = []; // 存储索引的单调栈
  let maxArea = 0;
  // 遍历每个柱子
  for (let i = 0; i < n; i++) {
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      const height = heights[stack.pop()];
      // 计算宽度  栈顶元素为当前柱子的索引，栈顶元素之前的元素为当前柱子左边的柱子
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      // 更新最大面积
      maxArea = Math.max(maxArea, height * width);
    }
    // 将当前柱子索引入栈
    stack.push(i);
  }
  // 处理剩余的柱子 -- 此时所有元素已遍历完成，处理栈中剩下的递增序列，它们的右边界都是数组末尾。
  while (stack.length) {
    const height = heights[stack.pop()];
    const width = stack.length ? n - stack[stack.length - 1] - 1 : n;
    maxArea = Math.max(maxArea, height * width);
  }
  return maxArea;
  // 暴力解法  O(n^2) 时间复杂度  思路： 遍历每个柱子，向左和向右扩展，找到最大矩形面积 
  // let result = 0;
  // for (let i = 0; i < heights.length; i++) {
  //   let left = i;
  //   let right = i;
  //   while (left >= 0 && heights[left] >= heights[i]) {
  //     left--;
  //   }
  //   while (right < heights.length && heights[right] >= heights[i]) {
  //     right++;
  //   }
  //   result = Math.max(result, heights[i] * (right - left - 1));
  // }
  // return result;
};

// 示例用法
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleArea([2, 4])); // 4