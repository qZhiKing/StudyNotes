/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  // 哈希表法，存储访问过的节点
  // if (!head) return false;
  // const map = new Map();
  // let curr = head;
  // while (curr) {
  //   if (map.has(curr)) {
  //     return true;
  //   }
  //   map.set(curr, true);
  //   curr = curr.next;
  // }
  // return false;
  // 快慢指针法 
  let slow = head, fast = head; // 乌龟和兔子同时从起点出发
  while (fast && fast.next) {
    slow = slow.next; // 乌龟走一步
    fast = fast.next.next; // 兔子走两步
    if (fast === slow) { // 兔子追上乌龟（套圈），说明有环
      return true;
    }
  }
  return false; // 访问到了链表末尾，无环
};