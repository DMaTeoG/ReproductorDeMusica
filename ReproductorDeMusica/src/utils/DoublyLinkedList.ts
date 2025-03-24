class Node<T> {
    data: T;
    next: Node<T> | null = null;
    prev: Node<T> | null = null;
  
    constructor(data: T) {
      this.data = data;
    }
  }
  
  export class DoublyLinkedList<T> {
    head: Node<T> | null = null;
    tail: Node<T> | null = null;
    current: Node<T> | null = null;
  
    add(data: T) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = this.tail = this.current = newNode;
      } else {
        this.tail!.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
    }
  
    next() {
      if (this.current?.next) {
        this.current = this.current.next;
      }
    }
  
    prev() {
      if (this.current?.prev) {
        this.current = this.current.prev;
      }
    }
  
    getCurrent() {
      return this.current ? this.current.data : null;
    }
  }
  