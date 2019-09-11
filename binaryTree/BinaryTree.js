/**
 * 二叉树
 * tips:左侧节点小于父节点,右侧节点大于父节点  左小右大
 */
class BinaryTree {
  constructor() {
    this.root = null;
  }
  /**
   * 插入数据
   */
  add(data) {
    let node = new Node(data);
    const addCb = (parent, node) => {
      if (parent.id > node.id) {
        // 放置在左侧
        if (!parent.left) {
          parent.left = node;
        } else {
          addCb(parent.left, node);
        }
      } else if (parent.id < node.id) {
        // 放置在右侧
        if (!parent.right) {
          parent.right = node;
        } else {
          addCb(parent.right, node);
        }
      }
    };
    if (!this.root) {
      this.root = node;
    } else {
      addCb(this.root, node);
    }
    return this;
  }
  /**
   * 删除数据
   */
  del(id) {
    const remove = (node, id) => {
      if (node.id > id) {
        node.left = remove(node.left, id);
        return node;
      } else if (node.id < id) {
        node.right = remove(node.right, id);
        return node;
      } else {
        // 删除节点是根节点
        if (node.left === null && node.right === null) {
          node = null;
          return node;
        } else if (node.left === null) {
          // 右侧有子节点
          node = node.right;
          return node;
        } else if (node.right === null) {
          // 左侧有子节点
          node = node.left;
          return node;
        } else if (node.left && node.right) {
          // 方法一: 从待删除节点的左子树找节点值最大的节点A，替换待删除节点，并删除节点A；
          // 方法二: 从待删除节点的右子树找节点值最小的节点A，替换待删除节点，并删除节点A。
          // 使用方法二 ---> 删除的节点下有两个分支 找到当前节点的右分支中最小的节点, 然后将该节点代替当前节点, 同时移除当前节点的右分支中最小的节点
          const findMinNode = node => {
            if (node.left) {
              return findMinNode(node.left);
            }
            return node;
          };
          // 查找最小节点(最小节点在左侧,递归查询左侧数据)
          const minNode = findMinNode(node.right);
          node.id = minNode.id;
          node.right = remove(node.right, node.id);
          return node;
        }
      }
    };

    if (!this.root) {
      throw Error('No node data yet');
    }
    remove(this.root, id);
  }
  /**
   * 查找数据
   */
  find(id) {
    if (!this.root) {
      return null;
    }

    // 递归查询
    const findCb = node => {
      // 递归查找左侧数据
      if (node.id > id) {
        return findCb(node.left);
      }
      // 递归查找右侧数据
      if (node.id < id) {
        return findCb(node.right);
      }
      // 返回查找值
      return node;
    };

    return findCb(this.root, id);
  }
  /**
   * 查询最大值
   * 最大数据在右侧节点，循环处理右侧节点查询
   */
  getMax() {
    if (!this.root || !this.root.right) {
      return null;
    }

    let currentNode = this.root;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode;
  }
  /**
   * 查询最小值
   * 最小数据在左侧节点，循环处理左侧节点查询
   */
  getMin() {
    if (!this.root && !this.root.left) {
      return null;
    }

    let currentNode = this.root;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }
  /**
   * 遍历数据
   */
  each(cb, type) {
    const TraversalMode = {
      // 先序遍历
      introduction(node, cb = noop) {
        if (node) {
          cb(node);
          this.introduction(node.left, cb);
          this.introduction(node.right, cb);
        }
      },
      // 中序遍历
      mediumOrder(node, cb = noop) {
        if (node) {
          this.introduction(node.left, cb);
          cb(node);
          this.introduction(node.right, cb);
        }
      },
      // 后序遍历
      postOrder(node, cb = noop) {
        if (node) {
          this.introduction(node.left, cb);
          this.introduction(node.right, cb);
          cb(node);
        }
      }
    };
    TraversalMode[type](this.root, cb);
  }
}

function noop() {}
/**
 * 创建节点
 */
function Node(data) {
  this.id = data.id;
  this.value = data.value;
  this.left = null;
  this.right = null;
}

