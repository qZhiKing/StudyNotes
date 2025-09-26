/**
 * 接雨水 -- 指针
 * @param {*} height 
 */
const trap = function (height) {
  if (!height || height.length < 3) {
    return 0;
  }
  let left = 0;           // 左指针
  let right = height.length - 1;  // 右指针
  let leftMax = 0;        // 左侧最大高度
  let rightMax = 0;       // 右侧最大高度
  let sum = 0;            // 雨水总量

  // 双指针向中间移动
  while (left < right) {
    // 更新左侧最大高度
    leftMax = Math.max(leftMax, height[left]);
    // 更新右侧最大高度
    rightMax = Math.max(rightMax, height[right]);
    console.log('左右指针位置--', left, right)
    // 根据较小的一边计算雨水
    if (leftMax < rightMax) {
      // 左侧较矮，计算当前位置雨水
      sum += leftMax - height[left];
      left++;
    } else {
      // 右侧较矮，计算当前位置雨水
      sum += rightMax - height[right];
      right--;
    }
    console.log('雨水和--', sum)
  }

  return sum;
};

const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
// const height = [4, 2, 0, 3, 2, 5]
console.log(trap(height));