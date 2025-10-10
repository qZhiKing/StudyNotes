/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  // 创建目标字符的频率映射
  const targetMap = new Map();
  for (const char of t) {
    targetMap.set(char, (targetMap.get(char) || 0) + 1);
  }
  // 窗口字符频率映射
  const windowMap = new Map();
  let left = 0;          // 左指针
  let right = 0;         // 右指针
  let valid = 0;         // 已满足的字符种类数量
  let start = 0;         // 最小子串的起始索引
  let minLen = Infinity; // 最小子串的长度
  while (right < s.length) {
    // 移动右指针，扩大窗口
    const char = s[right];
    right++;
    // 如果是目标字符，更新窗口映射
    if (targetMap.has(char)) {
      windowMap.set(char, (windowMap.get(char) || 0) + 1);
      // 当窗口中该字符数量等于目标数量时，满足条件的字符种类+1
      if (windowMap.get(char) === targetMap.get(char)) {
        valid++;
      }
    }
    // 当窗口包含所有目标字符时，尝试收缩左指针
    while (valid === targetMap.size) {
      // 更新最小子串
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }
      // 移动左指针，缩小窗口
      const leftChar = s[left];
      left++;
      // 如果移除的是目标字符，更新窗口映射
      if (targetMap.has(leftChar)) {
        if (windowMap.get(leftChar) === targetMap.get(leftChar)) {
          valid--;
        }
        windowMap.set(leftChar, windowMap.get(leftChar) - 1);
      }
    }
  }

  // 返回最小子串，如果不存在则返回空字符串
  return minLen === Infinity ? "" : s.substring(start, start + minLen);
};

console.log(minWindow("ADOBECODEBANC", "ABC"));