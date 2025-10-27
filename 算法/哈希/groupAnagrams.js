/**
 * 字母异位词分组
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  // 创建一个Map用于存储分组结果，键为排序后的字符串，值为异位词数组
  const map = new Map();
  for (const str of strs) {
    // 将字符串拆分为字符数组，排序后再拼接成字符串作为键
    const key = str.split("").sort().join("");
    // 如果键已存在，将当前字符串添加到对应数组；否则创建新数组
    if (map.has(key)) {
      map.get(key).push(str);
    } else {
      map.set(key, [str]);
    }
  }
  // 将Map中的值转换为数组返回
  return Array.from(map.values());
  // 使用Array.from和Map.groupBy方法实现
  // Array.from(Map.groupBy(strs, (s) => s.split("").sort().join("")).values())
};
// 示例用法
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// 输出: [["eat","tea","ate"],["tan","nat"],["bat"]]