/**
 * 链表
 */
class LinkedList {
  constructor(head = 0) {
    this.head = new Node(head);
    this.size = 1;
  }
  insert(addNode, parentNode) {
    let newNode = new Node(addNode);
    // 查找当前添加节点的前置节点
    let currentNode = this.find(parentNode);
    // 新节点的后置节点指向当前节点的后置节点
    newNode.next = currentNode.next ;
    // 新节点的前置节点指向当前节点的前置节点
    newNode.previous = currentNode;
    // 当前节点的后置节点指向新节点
    currentNode.next = newNode;

    this.size++;
  }
  remove(node) {
    let currentNode = this.find(node);

    if (currentNode.next !== null) {
      // 有后置节点
      // 当前删除节点的前置节点指向删除节点的后置节点
      currentNode.previous.next = currentNode.next;
      // 当前删除节点的后置节点指向删除节点的前置节点
      currentNode.next.previous = currentNode.previous;
      currentNode.next = null;
      currentNode.previous = null;
    } else {
      // 最后一个节点 直接删除
      currentNode.previous.next = null;
      currentNode.previous = null;
    }
    this.size--;
  }
  find(node) {
    let currentNode = this.head;

    if (!node) {
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      return currentNode;
    }

    // 遍历链表中所有节点直到找到当前节点为止
    while (currentNode && currentNode.node !== node) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  getLinkedList() {
    return this.head;
  }
  getSize() {
    return this.size;
  }
}

// 创建节点
class Node {
  constructor(node) {
    // 当前节点
    this.node = node;
    // 后置节点
    this.next = null;
    // 前置节点
    this.previous = null;
  }
}

// test...
var a = new LinkedList()
a.insert(1)
a.insert(2)
a.insert(3)

a.remove(2)