# 算法(JS 版)

## 1. 哈希表

算法中的 “哈希”（Hash）是一种将任意长度的输入数据通过特定规则（称为 “哈希函数”）映射到固定长度的输出值（称为 “哈希值” 或 “散列值”）的技术。它的核心作用是快速检索、数据校验和唯一标识，广泛应用于哈希表、密码加密、数据去重等场景。

### 1.1.两数之和

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** _`target`_ 的那 **两个** 整数，并返回它们的数组下标。

```javascript
/**
 * 两数之和：找出数组中两个数相加等于目标值的索引 时间复杂度 O (n)、空间复杂度 O (n)
 * @param {number[]} nums - 输入数组
 * @param {number} target - 目标和
 * @return {number[]} 两个数的索引数组
 */
var twoSum = function (nums, target) {
  // 存储已遍历的数值及其索引（数值 -> 索引）
  const numToIndex = new Map();

  for (let i = 0; i < nums.length; i++) {
    // 计算当前数值需要的互补数
    const complement = target - nums[i];

    // 若互补数已存在于Map中，直接返回两个索引
    if (numToIndex.has(complement)) {
      return [numToIndex.get(complement), i];
    }

    // 否则将当前数值和索引存入Map
    numToIndex.set(nums[i], i);
  }
};
```

### 1.2.字母异位词分组

给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

```javascript
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
```

### 1.3.最长连续序列

给定一个未排序的整数数组 `nums` ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

```javascript
/**
 * 最长连续序列
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length === 0) return 0;

  // 用Set存储所有元素，实现O(1)查找
  const numSet = new Set(nums);
  let maxLength = 0;

  for (const num of numSet) {
    // 只处理序列的起点（即num-1不存在时，才开始向后遍历）
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1; // 当前序列长度从1开始

      // 向后查找连续数字
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      // 更新最大长度
      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
};
```

## 2. 双指针

算法中的 “双指针” 是一种通过两个指针（或索引）协同遍历数据结构（通常是数组、链表或字符串）来解决问题的技巧。它的核心思想是利用两个指针的移动和位置关系，将原本需嵌套循环（O (n²) 复杂度）的问题优化为线性遍历（O (n) 复杂度），从而高效空间换时间的高效策略。
双指针的核心特点：

1. 指针定义：通常用两个变量（如 i 和 j、left 和 right）表示指针，分别指向数据结构中的不同位置。
2. 移动规则：根据问题场景，指针可以同向移动（如都从左向右）或反向移动（如一个从左、一个从右），移动方向和步长由具体逻辑决定。
3. 适用场景：主要解决线性结构的遍历问题，尤其是涉及 “子序列”“区间”“配对” 的场景（如两数之和、反转链表、移除重复元素等）。

### 2.1.移动零

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let n = nums.length;
  // 指向当前已处理的非零元素的末尾
  let left = 0;

  // 第一次遍历：将所有非零元素移到左侧
  for (let i = 0; i < n; i++) {
    if (nums[i] != 0) {
      nums[left] = nums[i];
      left++;
    }
  }

  // 第二次遍历：将剩余位置填充为 0
  for (let i = left; i < n; i++) {
    nums[i] = 0;
  }
};
```

### 2.2.盛最多水的容器

给定一个长度为 n 的整数数组 height。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。

```javascript
/**
 * 盛最多水的容器
 * @param {number[]} height
 * @return {number}
 * 思路：使用双指针，分别指向数组的左右边界，计算当前两个指针之间的面积，并更新最大面积。
 * 时间复杂度：O(n)，其中 n 是数组的长度。
 * 空间复杂度：O(1)。
 * 步骤：
 * 1. 定义一个函数 `maxArea`，接收一个参数 `height`，返回一个整数。
 * 2. 初始化两个指针 `left` 和 `right`，分别指向数组的左右边界。
 * 3. 初始化变量 `maxArea` 为 0，用于保存最大面积。
 * 4. 使用 while 循环，当 `left` 小于 `right` 时执行以下步骤：
 *     - 计算当前两个指针之间的面积，并更新 `maxArea`。
 *     - 根据当前两个指针之间的高度，移动指针的位置。
 *      - 如果 `height[left]` 小于 `height[right]`，则将 `left` 向右移动一位；否则将 `right` 向左移动一位。
 * 5. 返回 `maxArea`，即盛最多水的容器的容量。
 * 6. 示例：
 */
var maxArea = function (height) {
  let leftIndex = 0;
  let rightIndex = height.length - 1;
  let max = 0;
  while (leftIndex < rightIndex) {
    const area =
      Math.min(height[leftIndex], height[rightIndex]) *
      (rightIndex - leftIndex);
    if (area > max) {
      max = area;
    } else {
      if (height[leftIndex] < height[rightIndex]) {
        leftIndex++;
      } else {
        rightIndex--;
      }
    }
  }
  return max;
};
```

### 2.3.三数之和

给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。

```javascript
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
```

### 2.4.接雨水

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

```javascript
var trap = function (height) {
  const trap = function (height) {
    if (!height || height.length < 3) {
      return 0;
    }
    let left = 0; // 左指针
    let right = height.length - 1; // 右指针
    let leftMax = 0; // 左侧最大高度
    let rightMax = 0; // 右侧最大高度
    let sum = 0; // 雨水总量
    // 双指针向中间移动
    while (left < right) {
      // 更新左侧最大高度
      leftMax = Math.max(leftMax, height[left]);
      // 更新右侧最大高度
      rightMax = Math.max(rightMax, height[right]);
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
    }
    return sum;
  };
};
```

## 3. 滑动窗口

滑动窗口是算法中一种用于高效处理数组或字符串子序列问题的技巧，核心思想是通过一个「动态变化的区间（窗口）」在序列上滑动，从而在线性时间复杂度内解决原本可能需要嵌套循环（O (n²) 或更高）的问题。
简单来说，你可以把这个「窗口」想象成一个可伸缩的矩形框，框住数组 / 字符串中的一部分元素，通过移动窗口的左右边界（扩张或收缩），来找到符合条件的子序列（如最长 / 最短子串、最大 / 最小和等）。
滑动窗口的核心特点：

1. 区间性：窗口由两个指针（通常称为 left 和 right）定义，代表当前处理的子序列范围[left, right]。
2. 动态性：窗口会根据问题条件「滑动」—— 要么右指针右移扩大窗口，要么左指针右移缩小窗口，整个过程中窗口在序列上单向移动，不回溯。
3. 高效性：每个元素最多被 left 和 right 指针各访问一次，因此时间复杂度通常为 O (n)，远优于暴力解法。

### 3.1. 无重复字符的最长子串

给定一个字符串，请你找出其中不含有重复字符的最长子串的长度。

```javascript
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
    console.log(map, char, left, right, maxLen);
  }
  return maxLen;
};
```

### 3.2. 找到字符串中所有字母异位词

给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

```javascript
const sLen = s.length,
  pLen = p.length;
if (sLen < pLen) {
  return [];
}
const ans = [];
const count = Array(26).fill(0);
for (let i = 0; i < pLen; ++i) {
  ++count[s[i].charCodeAt() - "a".charCodeAt()];
  --count[p[i].charCodeAt() - "a".charCodeAt()];
}
let differ = 0;
for (let j = 0; j < 26; ++j) {
  if (count[j] !== 0) {
    ++differ;
  }
}
if (differ === 0) {
  ans.push(0);
}
for (let i = 0; i < sLen - pLen; ++i) {
  if (count[s[i].charCodeAt() - "a".charCodeAt()] === 1) {
    // 窗口中字母 s[i] 的数量与字符串 p 中的数量从不同变得相同
    --differ;
  } else if (count[s[i].charCodeAt() - "a".charCodeAt()] === 0) {
    // 窗口中字母 s[i] 的数量与字符串 p 中的数量从相同变得不同
    ++differ;
  }
  --count[s[i].charCodeAt() - "a".charCodeAt()];

  if (count[s[i + pLen].charCodeAt() - "a".charCodeAt()] === -1) {
    // 窗口中字母 s[i+pLen] 的数量与字符串 p 中的数量从不同变得相同
    --differ;
  } else if (count[s[i + pLen].charCodeAt() - "a".charCodeAt()] === 0) {
    // 窗口中字母 s[i+pLen] 的数量与字符串 p 中的数量从相同变得不同
    ++differ;
  }
  ++count[s[i + pLen].charCodeAt() - "a".charCodeAt()];

  if (differ === 0) {
    ans.push(i + 1);
  }
}
return ans;
```

## 4. 子串

在算法和字符串处理领域，子串（Substring） 是指从一个完整字符串中，通过指定起始位置和结束位置（或长度）截取出来的、连续的字符序列。它的核心特征是 “连续”—— 这是区分 “子串” 与 “子序列”（Subsequence，字符可不连续）的关键。

1. 连续性：子串的字符在原字符串中必须是 “不间断” 的。例如，从字符串 "abcde" 中截取的 "bcd" 是子串（字符连续），但 "ace" 不是子串（字符间隔排列，属于 “子序列”）。
2. 范围约束：子串的起始位置 start 和结束位置 end 需满足：0 ≤ start ≤ end ≤ 原字符串长度（若用 “0-based 索引”，即起始位置从 0 开始）；串长度 = end - start（若 start = end，则子串为空字符串 ""）。
3. 包含空串：根据定义，每个字符串都包含 “空子串”（如起始和结束位置相同的截取结果），且空子串的数量 = 原字符串长度 + 1（每个位置都能生成一个空串）。
4. 原串关联：子串的字符完全来自原字符串，不允许修改字符顺序或新增字符。

### 4.1. 和为 K 的子数组

给定一个整数数组和一个整数 k ，请找出该数组中和为 k 的连续子数组的个数。

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let count = 0;
  let prefixSum = 0;
  // 哈希表存储前缀和出现的次数，初始前缀和为0的情况出现1次
  const sumCount = new Map();
  sumCount.set(0, 1);
  for (const num of nums) {
    prefixSum += num; // 计算当前前缀和
    // 检查是否存在前缀和等于(prefixSum - k)
    if (sumCount.has(prefixSum - k)) {
      count += sumCount.get(prefixSum - k);
    }
    // 将当前前缀和加入哈希表
    sumCount.set(prefixSum, (sumCount.get(prefixSum) || 0) + 1);
  }
  return count;
};
```

### 4.2. 滑动窗口最大值

给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
返回 滑动窗口中的最大值 。

```javascript
var maxSlidingWindow = function (nums, k) {
  if (!nums.length || k === 0) return [];
  // 使用数组模拟双端队列
  const deque = [];
  const result = [];
  // 初始化第一个窗口
  for (let i = 0; i < k; i++) {
    // 移除队列中所有小于当前元素的元素
    while (deque.length && deque[deque.length - 1] < nums[i]) {
      deque.pop();
    }
    deque.push(nums[i]);
  }
  // 第一个窗口的最大值
  result.push(deque[0]);
  // 处理剩余元素，形成滑动窗口
  for (let i = k; i < nums.length; i++) {
    // 如果移除的元素是队列中的最大值，则也从队列中移除
    if (deque[0] === nums[i - k]) {
      deque.shift();
    }
    // 维护队列，确保队列是递减的
    while (deque.length && deque[deque.length - 1] < nums[i]) {
      deque.pop();
    }
    deque.push(nums[i]);
    // 当前窗口的最大值是队列的第一个元素
    result.push(deque[0]);
  }
  return result;
};
```

### 4.3. 最小覆盖子串

给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

```javascript
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
  let left = 0; // 左指针
  let right = 0; // 右指针
  let valid = 0; // 已满足的字符种类数量
  let start = 0; // 最小子串的起始索引
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
```

## 5. 普通数组

在算法领域，普通数组（也常简称为 “数组”）是一种最基础且常用的数据结构，它具有以下核心特点与关键作用：

1. 连续存储：数组的元素在内存中是连续排列的，这意味着可以通过元素的索引（下标）快速计算出其在内存中的位置。例如，一个数组起始地址为 base，每个元素占 size 字节，那么第 i 个元素的地址为 base + i \* size。
2. 索引访问：支持通过整数索引（通常从 0 开始）直接访问任意位置的元素，时间复杂度为 O(1)，这是数组高效性的核心体现。
3. 固定大小（静态数组）：在很多编程语言（如 C、C++ 的基本数组）中，数组在声明时需要指定大小，且大小不可动态改变；不过像 Python 的 list、Java 的 ArrayList 等属于动态数组，可自动扩容，但底层仍基于普通数组的连续存储逻辑扩展。

### 5.1. 最大子数组和

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。子数组是数组中的一个连续部分。

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let sum = nums[0],
    ans = nums[0];
  for (let i = 1; i < nums.length; i++) {
    sum = Math.max(sum + nums[i], nums[i]);
    ans = Math.max(ans, sum);
  }
  return ans;
};
```

### 5.2. 合并区间

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

```javascript
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  const sortedByFirstAsc = [...arr].sort((a, b) => a[0] - b[0]);
};
```

### 5.3. 轮转数组

给定一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  if (k > nums.length) {
    k = k % nums.length;
  }
  nums.unshift(...nums.splice(nums.length - k, k));
  return nums;
};
```

### 5.4. 除自身之外数组的乘积

给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。题目数据 保证 数组 nums 之中任意元素的全部前缀元素和后缀的乘积都在 32 位 整数范围内。

```javascript
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
```

### 5.5. 缺失的第一个正数

给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  const n = nums.length;
  // 第一步：原地置换，让每个正整数归位到正确的索引（nums[i] = i + 1）
  for (let i = 0; i < n; i++) {
    // 循环条件：当前数值是正整数，且在有效范围内（1~n），且目标位置的数值不等于当前数值（避免无限循环）
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      // 交换 nums[i] 和 nums[nums[i]-1]
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }
  // 第二步：检查哪个索引位置的数值不匹配，返回该位置+1
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }
  // 若所有位置都匹配，则缺失的是 n+1
  return n + 1;
};
```

## 6. 链表

1. 定义与基本结构
   链表是由一系列节点（Node）组成的数据结构，每个节点包含至少两部分信息：
   - 数据域：用于存储实际的数据，可以是任意类型，比如整数、字符串，或者是更复杂的自定义对象。
   - 指针域：存储指向下一个节点的引用（在单向链表中），或者同时存储指向前一个节点和下一个节点的引用（在双向链表中）。通过指针，节点之间相互连接，形成链状结构。
2. 链表的常见类型
   - 单向链表：每个节点只包含一个指向其后继节点的指针。它是最基本的链表形式，链表的头部（Head）是第一个节点，尾部（Tail）的节点指针指向 null ，表示链表结束。 例如，存储整数数据的单向链表，其结构可能如下：
     plaintext
     +-----+------+ +-----+------+ +-----+------+
     | data| next | --> | data| next | --> | data| next | --> null
     +-----+------+ +-----+------+ +-----+------+
   - 双向链表：每个节点除了存储数据和指向下一个节点的指针外，还包含一个指向前一个节点的指针。这使得在双向链表中，既可以从头部遍历到尾部，也能从尾部遍历到头部，方便在两个方向上进行数据操作。结构示例：
     plaintext
     <-- +-----+------+------+ +-----+------+------+ +-----+------+------+ -->
     | prev| data| next | --> | prev| data| next | --> | prev| data| next |
     +-----+------+------+ +-----+------+------+ +-----+------+------+
   - 循环链表：可以是单向循环链表或双向循环链表。在单向循环链表中，尾部节点的 next 指针指向链表的头部，形成一个环形结构；双向循环链表则是头部节点的 prev 指针指向尾部，尾部节点的 next 指针指向头部。 例如单向循环链表：
     plaintext
     +-----+------+ +-----+------+ +-----+------+
     | data| next | --> | data| next | --> | data| next | --> ... (最终回到第一个节点)
     +-----+------+ +-----+------+ +-----+------+
3. 链表的操作
   - 插入节点：在单向链表中插入新节点，通常需要先找到插入位置的前一个节点，然后修改指针指向。例如，要在节点 A 和节点 B 之间插入节点 C，操作过程是：让节点 C 的 next 指针指向节点 B，再让节点 A 的 next 指针指向节点 C 。双向链表插入操作类似，但需要同时更新前后两个方向的指针。插入操作的时间复杂度在平均情况下为 O (1)（如果已知插入位置的前一个节点），但如果需要先查找插入位置，则时间复杂度会变为 O (n)，n 是链表的长度。
   - 删除节点：对于单向链表，删除某个节点，需要找到该节点的前一个节点，将其 next 指针指向要删除节点的下一个节点。双向链表删除节点时，需要同时更新前后两个方向的指针。删除操作在平均情况下时间复杂度也为 O (1)（如果已知要删除的节点），若需先查找节点，时间复杂度为 O (n)。
   - 遍历链表：从链表的头部开始，通过节点的指针依次访问每个节点，直到遇到 null（单向链表）或者回到起始节点（循环链表）。单向链表和双向链表遍历的时间复杂度均为 O (n)，因为需要访问每个节点一次。
4. 链表的优势与劣势
   - 优势
     内存分配灵活：链表的节点在内存中不需要连续存储，它通过指针来建立节点之间的联系，因此在插入和删除节点时，不需要像数组那样移动大量元素，只需要修改指针指向，效率较高。
     动态性强：可以根据实际需求动态地增加或减少节点，方便实现动态数据集合，不需要预先确定数据的最大数量。
   - 劣势
     访问效率低：无法像数组那样通过索引直接访问元素，必须从链表头部开始逐个遍历节点，因此访问特定位置元素的时间复杂度为 O (n) 。
     占用额外空间：每个节点除了存储数据外，还需要存储指针，这会占用一定的额外内存空间。
5. 应用场景
   - 操作系统内存管理：操作系统使用链表来管理内存中的空闲块，方便快速分配和回收内存。
   - 哈希表的冲突处理：在哈希表中，当发生哈希冲突时，常用链表来存储具有相同哈希值的元素。
   - 邻接表表示图结构：在图的邻接表表示法中，链表用于存储每个顶点的邻接顶点信息。
   - 实现栈和队列：可以使用链表来实现栈和队列，利用链表的插入和删除特性，实现数据的先进先出（队列）或后进先出（栈）操作。

### 6.1. 相交链表

给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。

```javascript
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  const map = new Map();
  let pA = headA;
  // 存储链表A的所有节点
  while (pA) {
    map.set(pA, true);
    pA = pA.next;
  }
  // 检查链表B的节点是否在哈希表中
  let pB = headB;
  while (pB) {
    if (map.has(pB)) {
      return pB;
    }
    pB = pB.next;
  }
  return null;
};
```

### 6.2. 反转链表

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let curr = head;
  while (curr) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
};
```

### 6.3. 回文链表

给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  if (!head) return true;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let pre = null;
  while (slow) {
    const next = slow.next;
    slow.next = pre;
    pre = slow;
    slow = next;
  }
  // 比较反转后的链表和原链表
  let p1 = head;
  let p2 = pre;
  while (p2) {
    if (p1.val !== p2.val) {
      return false;
    }
    p1 = p1.next;
    p2 = p2.next;
  }
  return true;
};
```

### 6.4. 环形链表

给你一个链表的头节点 head ，判断链表中是否有环。如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。如果链表中存在环 ，则返回 true 。 否则，返回 false 。

```javascript
var hasCycle = function (head) {
  let slow = head,
    fast = head; // 乌龟和兔子同时从起点出发
  while (fast && fast.next) {
    slow = slow.next; // 乌龟走一步
    fast = fast.next.next; // 兔子走两步
    if (fast === slow) {
      // 兔子追上乌龟（套圈），说明有环
      return true;
    }
  }
  return false; // 访问到了链表末尾，无环
};
```

### 6.5. 合并两个有序的链表

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

```javascript
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  // 创建一个虚拟头节点
  const dummy = new ListNode();
  let curr = dummy;
  // 遍历两个链表，选择较小的节点连接到新链表
  while (list1 && list2) {
    if (list1.val < list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }
  // 连接剩余的节点
  curr.next = list1 || list2;
  return dummy.next;
};
```

### 6.6. 两数相加

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。请你将两个数相加，并以相同形式返回一个表示和的链表。你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

```javascript
var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode(0);
  let curr = dummy;
  let carry = 0;
  while (l1 || l2 || carry) {
    let sum = carry + (l1 ? l1.val : 0) + (l2 ? l2.val : 0);
    l1 && (l1 = l1.next);
    l2 && (l2 = l2.next);
    carry = Math.floor(sum / 10);
    sum = sum % 10;
    curr.next = new ListNode(sum);
    curr = curr.next;
  }
  return dummy.next;
};
```

## 7. 二叉树

1. 二叉树的定义: 二叉树是一种重要的树形数据结构，其特点是每个节点最多有两个子节点，分别称为 “左子节点” 和 “右子节点”，且子节点的顺序（左右）是明确的（即左右子节点交换后会变成不同的二叉树）。

2. 二叉树的核心结构:

   - 节点（Node）：二叉树中的每个元素都是一个节点。节点通常包含两个部分：数据（数据）和指针（指针）。
   - 根节点（Root Node）：二叉树的第一个节点，通常用一个特殊字符表示。
   - 子节点（Child Node）：节点的直接子节点。
   - 父节点（Parent Node）：节点的直接父节点。
   - 兄弟节点（Sibling Node）：具有相同父节点的节点。
   - 叶子节点（Leaf Node）：没有子节点的节点。
   - 边（Edge）：连接两个节点的边。
   - 路径（Path）：从根节点到某个节点的边序列。
   - 高度（Height）：从根节点到最远叶子节点的最长路径的长度。
   - 深度（Depth）：从根节点到某个节点的路径的长度。
   - 子树（Subtree）：包含某个节点的树。

3. 常见的二叉树类型

   - 满二叉树：除叶子节点外，每个节点都有左、右两个子节点，且所有叶子节点在同一层（例如，深度为 k 的满二叉树有 2ᵏ - 1 个节点）。
   - 完全二叉树：叶子节点集中在最下层和次下层，且最下层的叶子节点从左到右依次排列，不存在空出的左子节点（常用于实现堆结构）。
   - 二叉搜索树（BST）：左子树上所有节点的值均小于根节点的值，右子树上所有节点的值均大于根节点的值，且左右子树也满足这一特性（便于高效查 找、插入、删除操作）。
   - 平衡二叉树（如 AVL 树、红黑树）：左右子树的高度差不超过 1（或通过特定规则维持平衡），避免二叉搜索树退化为链表，保证操作效率稳定。

### 7.1.二叉树的中序遍历

给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。

```javascript
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const result = [];
  const stack = [];
  let current = root;
  // 中序遍历：左-根-右
  while (current || stack.length) {
    // 先遍历左子树
    while (current) {
      // 将当前节点入栈，继续遍历左子节点
      stack.push(current);
      // 移动到左子节点
      current = current.left;
    }
    // 栈非空，说明左子树遍历完毕，开始遍历右子树
    current = stack.pop();
    // 栈非空，说明右子树存在，将右子树节点入栈，继续遍历右子树
    result.push(current.val);
    // 移动到右子节点
    current = current.right;
  }

  return result;
};
```

### 7.2. 二叉树的最大深度

给定一个二叉树 root ，返回其最大深度。二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  let maxDep = 0;
  // 深度优先搜索  递归遍历每个子节点 计算深度
  function dfs(node, depth) {
    if (node) {
      maxDep = Math.max(maxDep, depth);
      dfs(node.left, depth + 1);
      dfs(node.right, depth + 1);
    } else {
      return;
    }
  }
  dfs(root, 1);
  return maxDep;
};
```

### 7.3. 翻转二叉树

给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

```js
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) return null;
  // 递归交换每个节点的左右子节点
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};
```

### 7.4. 对称二叉树

给你一个二叉树的根节点 root ， 检查它是否轴对称。
轴对称二叉树是镜像对称的。

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  const check = (p, q) => {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
  };
  return check(root.left, root.right);
};
```

### 7.5. 二叉树的直径

给你一棵二叉树的根节点，返回该树的 直径 。二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root 。两节点之间路径的 长度 由它们之间边数表示。

```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let diameter = 0;
  // 深度优先搜索  递归遍历每个子节点 计算深度
  function dfs(node) {
    if (!node) return 0;
    const leftDepth = dfs(node.left);
    const rightDepth = dfs(node.right);
    diameter = Math.max(diameter, leftDepth + rightDepth);
    return Math.max(leftDepth, rightDepth) + 1;
  }
  dfs(root);
  return diameter;
};
```

### 7.6. 二叉树的层序遍历

给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

```js
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
};
```

## 8. 二分查找

二分查找（Binary Search）是一种常用的搜索算法，它的基本思路是 repeatedly 将搜索区间缩小，直到找到目标元素或者区间为空。

### 8.1.搜索插入位置

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // 计算中间索引
    if (nums[mid] === target) {
      return mid; // 找到目标，返回索引
    } else if (nums[mid] < target) {
      left = mid + 1; // 目标在右半部分
    } else {
      right = mid - 1; // 目标在左半部分
    }
  }

  return nums[left] < target ? left + 1 : left;
};
```

### 8.2.搜索二位矩阵

给你一个满足下述两条属性的 m x n 整数矩阵：
每行中的整数从左到右按非严格递增顺序排列。
每行的第一个整数大于前一行的最后一个整数。
给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  // 两次循环
  let l = 0,
    r = matrix.length - 1;
  let t = 0;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (
      matrix[mid][0] <= target &&
      matrix[mid][matrix[mid].length - 1] >= target
    ) {
      t = mid;
      break;
    } else if (matrix[mid][0] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  if (l > r) return false;

  let left = 0,
    right = matrix[t].length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (matrix[t][mid] === target) {
      return true;
    } else if (matrix[t][mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
};
```

## 9. 栈

在算法中，栈（Stack） 是一种遵循 “后进先出（LIFO，Last In First Out）” 原则的线性数据结构，即最后放入的元素最先被取出，如同生活中叠放的盘子 —— 只能从顶端取放。

1. 栈的核心特性
   - 操作受限：仅允许在栈顶进行插入（入栈）和删除（出栈）操作，栈底元素不可直接访问。
   - 顺序性：元素按入栈顺序依次排列，栈顶是最新元素，栈底是最早入栈的元素。
2. 基本操作
   栈的核心操作包括：

   - push：向栈顶插入元素（入栈）。
   - pop：移除并返回栈顶元素（出栈）。
   - peek/top：返回栈顶元素（不删除）。
   - isEmpty：判断栈是否为空。
   - size：返回栈中元素个数。
     这些操作的时间复杂度均为 O(1)（只需操作栈顶，无需遍历）。

### 9.1. 有效的括号

括号匹配问题，判断给定的字符串中的括号是否合法。

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  class Stack {
    constructor() {
      this.stack = [];
    }
    push(item) {
      this.stack.push(item);
    }
    pop() {
      if (this.isEmpty()) {
        return null;
      }
      return this.stack.pop();
    }
    peek() {
      return this.stack[this.stack.length - 1];
    }
    isEmpty() {
      return this.stack.length === 0;
    }
    size() {
      return this.stack.length;
    }
  }
  const stack = new Stack();
  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char in map) {
      if (stack.pop() !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.isEmpty();
};
```

### 9.2. 最小栈

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
实现 MinStack 类:
-MinStack() 初始化堆栈对象。
-void push(int val) 将元素 val 推入堆栈。
-void pop() 删除堆栈顶部的元素。
-int top() 获取堆栈顶部的元素。
-int getMin() 获取堆栈中的最小元素。

```js
var MinStack = function () {
  this.x_stack = [];
  this.min_stack = [Infinity];
};

MinStack.prototype.push = function (x) {
  this.x_stack.push(x);
  this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

MinStack.prototype.pop = function () {
  this.x_stack.pop();
  this.min_stack.pop();
};

MinStack.prototype.top = function () {
  return this.x_stack[this.x_stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.min_stack[this.min_stack.length - 1];
};
```

### 9.3 字符串解码栈

给定一个经过编码的字符串，返回它解码后的字符串。
编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

```js
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
```

### 9.4 每日温度

给定一个整数数组  temperatures ，表示每天的温度，返回一个数组  answer ，其中  answer[i]  是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用  0 来代替。

```js
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  const res = new Array(n).fill(0);
  const stack = []; // 存储索引的单调栈
  for (let i = 0; i < n; i++) {
    while (
      stack.length > 0 &&
      temperatures[stack[stack.length - 1]] < temperatures[i]
    ) {
      const prevIndex = stack.pop();
      res[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return res;
};
```

### 9.5. 柱状图中最大的矩形

给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。求在该柱状图中，能够勾勒出来的矩形的最大面积。

```js
var largestRectangleArea = function (heights) {
  // 单调栈解法  O(n) 时间复杂度
  const n = heights.length;
  const stack = []; // 存储索引的单调栈
  let maxArea = 0;
  // 遍历每个柱子
  for (let i = 0; i < n; i++) {
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      const height = heights[stack.pop()];
      // 计算宽度  栈顶元素为当前柱子的索引，栈顶元素之前的元素为当前柱子左边的柱子
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      // 更新最大面积
      maxArea = Math.max(maxArea, height * width);
    }
    // 将当前柱子索引入栈
    stack.push(i);
  }
  // 处理剩余的柱子 -- 此时所有元素已遍历完成，处理栈中剩下的递增序列，它们的右边界都是数组末尾。
  while (stack.length) {
    const height = heights[stack.pop()];
    const width = stack.length ? n - stack[stack.length - 1] - 1 : n;
    maxArea = Math.max(maxArea, height * width);
  }
  return maxArea;
};
```

## 10. 堆
