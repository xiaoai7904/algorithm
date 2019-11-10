/**
 * 栈
 * 提供添加(push) 删除(pop) 大小(size) 为空判断 清空
 * js中的Array就是栈的应用
 */
class Stack {
  stackItems = [];
  /**
   * 入栈
   * @param {any} item 推入栈中的数据
   * @return void
   */
  push(item) {
    this.stackItems.push(item);
  }
  /**
   * 出栈
   */
  pop() {
    this.stackItems.pop();
  }
  /**
   * 获取栈顶数据
   */
  peek() {
    return this.stackItems[this.stackItems.length - 1];
  }
  /**
   * 获取栈的大小
   * @return number
   */
  size() {
    return this.stackItems.length;
  }
  /**
   * 清空栈
   */
  clear() {
    this.stackItem = [];
  }
  /**
   * 是否为空栈
   * @return boolean
   */
  isEmpty() {
    return this.stackItem.length === 0;
  }
}
