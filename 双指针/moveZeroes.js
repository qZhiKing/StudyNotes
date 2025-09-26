/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let n = nums.length;
  // 指向当前已处理的非零元素的末尾
  let left = 0;

  // 第一次遍历：将所有非零元素移到左侧
  for (let i = 0; i < n; i++) {
    if (nums[i] != 0) {
      nums[left] = nums[i];
      left++;
    }
  }

  // 第二次遍历：将剩余位置填充为 0
  for (let i = left; i < n; i++) {
    nums[i] = 0;
  }
};


// 时间复杂度：O(n)
// 空间复杂度：O(1)
const nums = [0, 1, 0, 3, 12];
moveZeroes(nums);
console.log(nums);  // 输出：[1, 3, 12, 0, 0]