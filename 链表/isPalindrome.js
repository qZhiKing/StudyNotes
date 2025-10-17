/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  // 遍历链表，将节点值存入数组，然后使用双指针法判断是否为回文
  // if (!head) return true;
  // const map = [];
  // let curr = head;
  // while (curr) {
  //   map.push(curr.val);
  //   curr = curr.next;
  // }
  // for (let i = 0; i < map.length / 2; i++) {
  //   if (map[i] !== map[map.length - 1 - i]) {
  //     return false;
  //   }
  // }
  // return true;

  // 快慢指针法，将链表后半部分翻转，然后比较
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