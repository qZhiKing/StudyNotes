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