const Node = require("./BST_node");
const { mergeSort } = require("./supportFnc");

class BST {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  #sortedArrToBST(sortArr) {
    if (sortArr.length === 0) return null;

    const middle = Math.floor(sortArr.length / 2);
    const rootNode = Node(sortArr[middle]);

    rootNode.left = this.#sortedArrToBST(sortArr.slice(0, middle));
    rootNode.right = this.#sortedArrToBST(sortArr.slice(middle + 1));

    return rootNode;
  }

  buildTree(array) {
    const sortArr = mergeSort(array);
    return this.#sortedArrToBST(sortArr);
  }

  #insertRecursion(root, value) {
    if (root === null) return Node(value);

    if (value < root.value) {
      root.left = this.#insertRecursion(root.left, value);
    } else if (value > root.value) {
      root.right = this.#insertRecursion(root.right, value);
    }

    return root;
  }

  insert(value) {
    this.root = this.#insertRecursion(this.root, value);
  }

  #minValueNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  #deleteNode(root, value) {
    if (root === null) return root;

    if (value < root.value) {
      root.left = this.#deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.#deleteNode(root.right, value);
    } else {
      // Case 1: Node to delete has no children or 1 child
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;

      // Case 2: Node to delete has 2 children

      // 1st method
      // /*

      let temp = this.#minValueNode(root.right);
      root.value = temp.value;
      root.right = this.#deleteNode(root.right, temp.value);

      // */

      // 2nd method
      /* 
      
      let parent = root;
      let successor = root.right;

      while (successor.left !== null) {
        parent = successor;
        successor = successor.left;
      }

      root.value = successor.value;

      // successor.left is null, doesn't enter the loop case
      if (parent === root) {
        parent.right = successor.right;
      } else {
        // enter the loop case
        parent.left = successor.right;
      }

      */
    }

    return root;
  }

  delete(value) {
    this.root = this.#deleteNode(this.root, value);
  }

  #findRecursion(root, value) {
    if (root === null || root.value === value) return root;

    if (value < root.value) {
      return this.#findRecursion(root.left, value);
    } else if (value > root.value) {
      return this.#findRecursion(root.right, value);
    }
  }

  find(value) {
    // Recursive method
    // return this.#findRecursion(this.root, value);

    // Iterative method
    let temp = this.root;

    while (temp !== null) {
      if (value < temp.value) {
        temp = temp.left;
      } else if (value > temp.value) {
        temp = temp.right;
      } else {
        return temp;
      }
    }

    return null;
  }

  levelOrder(cb = null) {
    let queue = [this.root];
    let temp = this.root;
    const array = [];

    while (queue.length > 0) {
      if (cb) {
        cb(temp);
      }

      if (temp.left !== null) queue.push(temp.left);
      if (temp.right !== null) queue.push(temp.right);

      array.push(queue.shift().value);

      temp = queue[0];
    }

    return array;
  }
}

module.exports = BST;
