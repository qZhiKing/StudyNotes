/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
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