/**
 * 字典
 */
class Dictionary {
  constructor() {
    this.datastore = [];
  }
  /**
   * 添加数据
   * @param {string} key 
   * @param {any} value 
   */
  setData(key, value) {
    this.datastore[key] = value;
  }
  /**
   * 获取数据 不传key获取全部数据
   * @param {string} key 
   */
  getData(key) {
    if (key) {
      return this.datastore[key];
    }
    return this.datastore;
  }
  /**
   * 删除元素 不传key删除全部元素
   * @param {string} key 需要删除的元素key
   */
  remove(key) {
    if (key) {
      delete this.datastore[key];
      return this.datastore;
    }

    for (let i in Object.keys(this.datastore)) {
      this.remove(i);
    }
  }
  /**
   * 获取数据长度
   */
  getSize() {
    let count = 0;
    // 如果数据中key是字符串 使用Object.keys(this.datastore).length会获取不到实际长度
    for (let i in Object.keys(this.datastore)) {
      ++count;
    }
    return count;
  }
  /**
   * 获取排序数据
   * @param {function} sortCb 排序回调
   */
  getSortData(sortCb) {
    if (sortCb && typeof sortCb === 'function') {
      return Object.keys(this.datastore).sort(sortCb);
    }
    return Object.keys(this.datastore).sort();
  }
}


// test

var a = new Dictionary()

a.setData('a1', 1)
a.setData('a2', 2)
a.setData('a3', 3)
a.setData('a4', 4)
a.setData('a5', 5)
a.setData('1', 5)

console.log(a.getSize())
console.log(a.getData())
console.log(a.getData('a1'))


console.log(a.getSortData())