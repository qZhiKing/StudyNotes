/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */


// 使用两个栈，一个栈存储元素，一个栈存储当前栈中的最小值
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

// 使用一个栈， 用二维数组存储每个元素和当前最小值
class MinStack {
  constructor() {
    // 栈中存储数组 [当前值, 当前最小值]
    this.stack = [];
  }

  // 入栈
  push(x) {
    if (this.stack.length === 0) {
      // 栈为空时，当前值就是最小值
      this.stack.push([x, x]);
    } else {
      // 栈非空时，取当前值与栈顶元素的最小值比较
      const min = Math.min(x, this.stack[this.stack.length - 1][1]);
      this.stack.push([x, min]);
    }
  }

  // 出栈
  pop() {
    this.stack.pop();
  }

  // 获取栈顶元素值
  top() {
    return this.stack[this.stack.length - 1][0];
  }

  // 获取当前最小值
  getMin() {
    return this.stack[this.stack.length - 1][1];
  }
}

