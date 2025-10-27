/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  // // 初始化双指针，分别指向两个链表的头部
  // let pA = headA;
  // let pB = headB;
  // // 当两个指针不相等时继续移动
  // while (pA !== pB) {
  //   // 若pA到达A的尾部，切换到B的头部；否则继续后移
  //   pA = pA === null ? headB : pA.next;
  //   // 若pB到达B的尾部，切换到A的头部；否则继续后移
  //   pB = pB === null ? headA : pB.next;
  // }
  // // 若相交，返回相交节点；否则返回null
  // return pA;
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

console.log(getIntersectionNode([4, 1, 8, 4, 5], [5, 0, 1, 8, 4, 5]));