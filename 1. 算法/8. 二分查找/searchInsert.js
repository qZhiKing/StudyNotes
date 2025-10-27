/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // 计算中间索引
    if (nums[mid] === target) {
      return mid; // 找到目标，返回索引
    } else if (nums[mid] < target) {
      left = mid + 1; // 目标在右半部分
    } else {
      right = mid - 1; // 目标在左半部分
    }
  }

  return nums[left] < target ? left + 1 : left;
};