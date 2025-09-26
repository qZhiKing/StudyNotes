/**
 * 最长连续序列
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length === 0) return 0;

  // 用Set存储所有元素，实现O(1)查找
  const numSet = new Set(nums);
  let maxLength = 0;

  for (const num of numSet) {
    // 只处理序列的起点（即num-1不存在时，才开始向后遍历）
    console.log(num, numSet)
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1; // 当前序列长度从1开始

      // 向后查找连续数字
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      // 更新最大长度
      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
};
// 示例用法
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4