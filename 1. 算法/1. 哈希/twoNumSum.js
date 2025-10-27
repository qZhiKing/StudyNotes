/**
 * 两数之和：找出数组中两个数相加等于目标值的索引 时间复杂度 O (n)、空间复杂度 O (n)
 * @param {number[]} nums - 输入数组
 * @param {number} target - 目标和
 * @return {number[]} 两个数的索引数组
 */
var twoSum = function (nums, target) {
  // 存储已遍历的数值及其索引（数值 -> 索引）
  const numToIndex = new Map();

  for (let i = 0; i < nums.length; i++) {
    // 计算当前数值需要的互补数
    const complement = target - nums[i];

    // 若互补数已存在于Map中，直接返回两个索引
    if (numToIndex.has(complement)) {
      return [numToIndex.get(complement), i];
    }

    // 否则将当前数值和索引存入Map
    numToIndex.set(nums[i], i);
  }
};

// 示例用法
console.log(twoSum([2, 7, 11, 15], 9)); // 输出: [0, 1]