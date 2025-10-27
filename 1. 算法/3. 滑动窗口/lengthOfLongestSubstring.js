var lengthOfLongestSubstring = function (s) {
  let map = new Map(); // 记录字符最后出现的索引
  let maxLen = 0;
  let left = 0; // 窗口左边界

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    // 若字符已在窗口内（map有记录且索引≥left），则移动左指针到重复字符的下一位
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1;
    }
    // 更新字符最后出现的索引
    map.set(char, right);
    // 计算当前窗口长度，更新最大长度
    maxLen = Math.max(maxLen, right - left + 1);
    console.log(map, char, left, right, maxLen)
  }
  return maxLen;
};

console.log(lengthOfLongestSubstring('jbpnbwwd'))