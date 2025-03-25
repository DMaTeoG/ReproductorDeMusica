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

  // Function to remove a node with specific data
  remove(data: T) {
    if (!this.head) return; // If the list is empty, do nothing

    let nodeToRemove = this.head;

    // Check if the node to remove is the head
    if (nodeToRemove.data === data) {
      if (nodeToRemove === this.head && nodeToRemove === this.tail) {
        this.head = this.tail = this.current = null;
      } else {
        this.head = this.head.next;
        this.head!.prev = null;
      }
      return;
    }

    // Traverse the list to find the node
    while (nodeToRemove) {
      if (nodeToRemove.data === data) {
        // If node is in the middle or at the tail
        if (nodeToRemove === this.tail) {
          this.tail = this.tail.prev;
          this.tail!.next = null;
        } else {
          nodeToRemove.prev!.next = nodeToRemove.next;
          if (nodeToRemove.next) {
            nodeToRemove.next.prev = nodeToRemove.prev;
          }
        }
        return;
      }
      nodeToRemove = nodeToRemove;
    }
  }
}
