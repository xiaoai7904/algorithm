/**
 * 集合
 * 成员的值都是唯一的，没有重复的值，无顺序的数据结构
 * es6已经原生支持集合 Set
 */
class Collection {
  constructor(value = [], es6Set = false) {
    this.__setInstance = null;

    // 浏览器支持Set构造函数,就是用原生Set处理数据
    if (typeof Set === 'function' && es6Set) {
      this.__setInstance = new Set(value);
      return this.__setInstance;
    }

    this[`[[Entries]]`] = new Array();
    this.size = 0;
  }
  /**
   * 添加成员
   * @param {any} value
   * @return void
   */
  add(value) {
    if (this.has(value)) return;

    this[`[[Entries]]`].push(value);
    this.size = this[`[[Entries]]`].length;
  }
  /**
   * 清除所有成员
   */
  clear() {
    this[`[[Entries]]`] = [];
    this.size = 0;
  }
  /**
   * 删除某个值，返回一个布尔值，表示删除是否成功
   * @param {any} value
   * @return boolean
   */
  delete(value) {
    if (!this.has(value)) return false;

    const oldLength = this[`[[Entries]]`].length;

    this[`[[Entries]]`] = this[`[[Entries]]`].filter(item => item !== value);
    this.size = this[`[[Entries]]`].length;

    return oldLength !== this.size;
  }
  /**
   * 使用回调函数遍历每个成员
   * @param {function} cb
   * @return void
   */
  forEach(cb) {
    let [i, len] = [0, this[`[[Entries]]`].length];

    for (; i < len; i++) {
      let item = this[`[[Entries]]`][i];
      if (cb && typeof cb === 'function') {
        cb(item);
      }
    }
  }
  /**
   * 返回一个布尔值，表示该值是否为Set的成员
   * @param {any} value
   * @return boolean
   */
  has(value) {
    const types = Object.prototype.toString.call(value);
    // 对象 数组 函数都不相等
    if (types === '[object Object]' || types === '[object Function]' || types === '[object Array]') {
      return false;
    }

    return this[`[[Entries]]`].some(item => item === value);
  }
  /**
   * 返回键值对的遍历器
   * @return SetIterator
   */
  entries() {
    return new SetIterator(this[`[[Entries]]`], 'entries');
  }
  /**
   * 返回键名的遍历器
   * @return SetIterator
   */
  keys() {
    return new SetIterator(this[`[[Entries]]`]);
  }
  /**
   * 返回键值的遍历器
   * @return SetIterator
   */
  values() {
    return new SetIterator(this[`[[Entries]]`]);
  }
}

/**
 * 迭代器
 * @param {array} value
 * @param {string} IteratorKind
 */
function SetIterator(value, IteratorKind = 'values') {
  if (!value) {
    throw new Error('The first parameter cannot be empty!');
  }

  if (!Array.isArray(value)) {
    throw new Error('The first parameter can only be an array type!');
  }

  const handlerData = function() {
    let newData = [];
    newData = value.map(item => {
      return {
        key: item,
        value: item
      };
    });
    return newData;
  };

  this['[[IteratorHasMore]]'] = !!value.length;
  this['[[IteratorIndex]]'] = 0;
  this['[[IteratorKind]]'] = IteratorKind;
  this['[[Entries]]'] = IteratorKind === 'values' ? value : handlerData();
}

SetIterator.prototype = {
  constructor: SetIterator,

  [Symbol('Symbol.toStringTag')]: 'Set Iterator',

  [Symbol.iterator]() {
    return this;
  },

  next() {
    let currentValue = this['[[Entries]]'][this['[[IteratorIndex]]']];

    if (currentValue) {
      this['[[IteratorIndex]]']++;
      this['[[IteratorHasMore]]'] = true;
      return {
        value: currentValue,
        done: false
      };
    }
    this['[[IteratorHasMore]]'] = false;
    return {
      value: undefined,
      done: true
    };
  }
};
