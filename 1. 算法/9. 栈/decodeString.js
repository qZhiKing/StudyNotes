/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  // 创建栈stack = [];
  const stack = [];
  // 遍历字符串s的每个字符ch
  for (const ch of s) {
    if (ch !== "]") {
      stack.push(ch);
    } else {
      // 创建一个空字符串res = ""
      let res = "";
      // 循环，直到栈顶元素为"["
      while (stack[stack.length - 1] !== "[") {
        res = stack.pop() + res;
      }
      // 弹出"["
      stack.pop();
      // 获取数字k
      let k = "";
      while (stack.length > 0 && !isNaN(stack[stack.length - 1])) {
        k = stack.pop() + k;
      }
      // 将当前字符串res重复k次后压入栈中
      stack.push(res.repeat(Number(k)));
    }
  }
  // 返回栈中所有元素连接后的字符串
  return stack.join("");
};
// 示例用法
console.log(decodeString("3[a]2[bc]")); // "aaabcbc"
console.log(decodeString("3[a2[c]]")); // "accaccacc"
console.log(decodeString("2[abc]3[cd]ef")); // "abcabccdcdcdef"