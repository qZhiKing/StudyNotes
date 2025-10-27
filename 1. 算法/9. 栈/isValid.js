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