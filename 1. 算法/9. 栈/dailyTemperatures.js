/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  // 暴力解法
  // const n = temperatures.length;
  // const res = new Array(n).fill(0);
  // for (let i = 0; i < n; i++) {
  //   let j = i + 1;
  //   for (j; j < n; j++) {
  //     if (temperatures[j] > temperatures[i]) {
  //       res[i] = j - i;
  //       break;
  //     }
  //   }
  // }
  // return res;

  // 单调栈解法
  const n = temperatures.length;
  const res = new Array(n).fill(0);
  const stack = []; // 存储索引的单调栈
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const prevIndex = stack.pop();
      res[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return res;
};

// 示例用法
var temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
var result = dailyTemperatures(temperatures);
console.log(result);