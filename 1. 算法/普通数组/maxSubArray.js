/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // let ans = nums[0];
  // let sum = 0;
  // for (const num of nums) {
  //   if (sum > 0) {
  //     sum += num;
  //   } else {
  //     sum = num;
  //   }
  //   ans = Math.max(ans, sum);
  // }
  // return ans;
  let sum = nums[0], ans = nums[0]
  for (let i = 1; i < nums.length; i++) {
    sum = Math.max(sum + nums[i], nums[i])
    ans = Math.max(ans, sum)
  }
  return ans
};
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray([1]));
console.log(maxSubArray([5, 4, -1, 7, 8]));
console.log(maxSubArray([-2, -1]));