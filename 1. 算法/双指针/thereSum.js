/**
 * 三数之和
 * @param {number[]} nums
 * @return {number[][]}
 * 思路：
 * 1. 首先对数组进行排序，以便进行双指针操作。
 * 2. 创建一个空数组 `result` 用于存储结果。
 * 3. 遍历数组，选择一个数作为第一个数。
 * 4. 使用双指针操作，将剩余的数组分为左右两部分。
 * 5. 使用两个指针 `left` 和 `right`，分别指向左右边界。
 * 6. 计算当前三个数的和 `sum`。
 * 7. 根据 `sum` 的大小，移动指针的位置。
 * 8. 如果 `sum` 为 0，则将当前三元组添加到结果数组中，并移动指针位置。
 * 9. 跳过重复的数，并继续遍历。
 * 10. 返回结果数组。
 * 示例：
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 输入：nums = [0,1,1]
 * 输出：[]
 * 输入：nums = [0,0,0]
 * 输出：[[0,0,0]]
 */
var threeSum = function (nums) {
  // 先对数组进行排序
  nums.sort((a, b) => a - b);
  let result = [];
  // 遍历数组，固定第一个数
  for (let i = 0; i < nums.length - 2; i++) {
    // 如果第一个数大于0，则后面不可能有和为0的组合
    if (nums[i] > 0) break;
    // 跳过重复的第一个数
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      let sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        result.push([nums[i], nums[l], nums[r]]);
        // 跳过重复的第二个数
        while (l < r && nums[l] === nums[l + 1]) l++;
        // 跳过重复的第三个数
        while (l < r && nums[r] === nums[r - 1]) r--;
        // 移动指针寻找下一组可能的组合
        l++;
        r--;
      } else if (sum < 0) {
        // 和小于0，需要增大和，左指针右移
        l++;
      } else {
        // 和大于0，需要减小和，右指针左移
        r--;
      }
    }
  }
  return result;
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// console.log(threeSum([0, 0, 0, 0]));