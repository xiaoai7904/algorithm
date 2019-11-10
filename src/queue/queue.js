/**
 * 队列
 * 队列用于存储按顺序排列的数据,先进先出(FIFO)
 */
class Queue {
  constructor() {
    this.queueList = [];
  }
  /**
   * 入队
   * @param {any} item
   * @return void
   */
  queued(item, level = 1) {
    if (this.isEmpty()) {
      this.queueList.push({ item, level });
    } else {
      let [i, len, isAdd] = [0, this.size(), true];

      for (; i < len; i++) {
        if (this.queueList[i].level > level) {
          isAdd = false;
          this.queueList.splice(i, 0, { item, level });
          return this.queueList;
        }
      }
      isAdd && this.queueList.push({ item, level });
    }
    return this.queueList;
  }
  /**
   * 出队
   * @return array
   */
  dequeue() {
    return this.queueList.shift();
  }
  /**
   * 获取对头
   * @return any
   */
  first() {
    return this.queueList[0];
  }
  /**
   * 获取队尾
   * @return any
   */
  last() {
    return this.queueList[this.size() - 1];
  }
  /**
   * 是否为空
   */
  isEmpty() {
    return this.size() > 0 ? false : true;
  }
  /**
   * 队列长度
   * @return number
   */
  size() {
    return this.queueList.length;
  }
  /**
   * 清空队列
   */
  clear() {
    this.queueList = [];
  }
  /**
   * 打印原始数据
   */
  toString() {
    return JSON.stringify(this.queueList);
  }
}
