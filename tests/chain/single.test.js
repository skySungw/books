class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
class LinkList {
  constructor() {
    this.length = 0;
    this.head = null;
  }
  // 添加节点
  append(element) {
    let node = new Node(element);
    if (this.head) {
      let current = this.head;
      while(current.next) {
        current = current.next;
      }
      current.next = node;
    } else {
      this.head = node;
    }
    this.length++;
  }
  // 获取链表
  getList() {
    if (!this.head) {
      return '';
    }
    let current = this.head;
    let list = [];
    while (current) {
      list.push(current.element);
      current = current.next;
    }
    return list.join(',');
  }
  // 获取链表长度
  getLength() {
    return this.length;
  }
}

const list = new LinkList();
list.append(3);
list.append(10);
list.append(20);
list.append(40);
// 链表
const res = list.getList();
console.log('链表结构：', res);
// 链表长度
const length = list.getLength();
console.log("链表长度：", length);