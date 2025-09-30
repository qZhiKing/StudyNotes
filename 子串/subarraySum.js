/**
 * 和为 K 的子数组的个数
 * 给定一个整数数组和一个整数 k ，请找出该数组中和为 k 的连续子数组的个数。
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  // const len = nums.length;
  // let count = 0;
  // for (let i = 0; i < len; i++) {
  //   let sum = 0;
  //   for (let j = i; j < len; j++) {
  //     sum += nums[j];
  //     if (sum === k) {
  //       count++;
  //     }
  //   }
  // }
  let count = 0;
  let prefixSum = 0;
  // 哈希表存储前缀和出现的次数，初始前缀和为0的情况出现1次
  const sumCount = new Map();
  sumCount.set(0, 1);

  for (const num of nums) {
    prefixSum += num; // 计算当前前缀和
    console.log(prefixSum, sumCount, prefixSum - k, '---1')
    // 检查是否存在前缀和等于(prefixSum - k)
    if (sumCount.has(prefixSum - k)) {
      count += sumCount.get(prefixSum - k);
    }

    // 将当前前缀和加入哈希表
    sumCount.set(prefixSum, (sumCount.get(prefixSum) || 0) + 1);
    console.log(sumCount, count, '---2')
  }

  return count;
};

const nums = [1, 2, 3, 3, 2, 1, 2];
const k = 3;

console.log(subarraySum(nums, k));