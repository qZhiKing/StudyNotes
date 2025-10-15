/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);
  let leftProduct = 1;
  let rightProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] *= leftProduct;
    leftProduct *= nums[i];
    const j = n - 1 - i;
    result[j] *= rightProduct;
    rightProduct *= nums[j];
  }
  return result;
};

console.log(productExceptSelf([1, 2, 3, 4])); // [24,12,8,6]
// console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0,0,9,0,0]