/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
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

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
let root = new TreeNode(1);
root.right = new TreeNode(2);
root.right.left = new TreeNode(3);
console.log(inorderTraversal(root)); // [1,3,2]