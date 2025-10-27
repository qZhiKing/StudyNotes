/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  // const arr = [];
  // if (k <= 0) return arr;
  // for (let i = 0; i < nums.length - k; i++) {
  //   let max;
  //   if (!max) {
  //     max = Math.max(...nums.slice(i, i + k));
  //   } else {
  //     if (nums[i - 1] >= max) {
  //       max = Math.max(...nums.slice(i, i + k));
  //     } else {
  //       if (nums[i + k - 1] >= max) {
  //         max = nums[i + k - 1];
  //       }
  //     }
  //   }
  //   arr.push(max);
  // }
  // return arr;
  if (!nums.length || k === 0) return [];
  // 使用数组模拟双端队列
  const deque = [];
  const result = [];
  // 初始化第一个窗口
  for (let i = 0; i < k; i++) {
    // 移除队列中所有小于当前元素的元素
    while (deque.length && deque[deque.length - 1] < nums[i]) {
      deque.pop();
    }
    deque.push(nums[i]);
  }
  // 第一个窗口的最大值
  result.push(deque[0]);
  // 处理剩余元素，形成滑动窗口
  for (let i = k; i < nums.length; i++) {
    // 如果移除的元素是队列中的最大值，则也从队列中移除
    if (deque[0] === nums[i - k]) {
      deque.shift();
    }
    // 维护队列，确保队列是递减的
    while (deque.length && deque[deque.length - 1] < nums[i]) {
      deque.pop();
    }
    deque.push(nums[i]);
    // 当前窗口的最大值是队列的第一个元素
    result.push(deque[0]);
  }
  return result;
};
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));