/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  const n = nums.length;
  // 第一步：原地置换，让每个正整数归位到正确的索引（nums[i] = i + 1）
  for (let i = 0; i < n; i++) {
    // 循环条件：当前数值是正整数，且在有效范围内（1~n），且目标位置的数值不等于当前数值（避免无限循环）
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      // 交换 nums[i] 和 nums[nums[i]-1]
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }
  // 第二步：检查哪个索引位置的数值不匹配，返回该位置+1
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }
  // 若所有位置都匹配，则缺失的是 n+1
  return n + 1;
};

console.log(firstMissingPositive([1, 2, 0])); // 3
console.log(firstMissingPositive([3, 4, -1, 1])); // 2
console.log(firstMissingPositive([7, 8, 9, 11, 12])); // 1