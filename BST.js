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

  #levelOrderIteration(cb = null) {
    let queue = [this.root];
    let temp = this.root;
    const array = [];

    while (queue.length > 0) {
      if (cb) {
        cb(temp);
      }

      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);

      array.push(queue.shift().value);

      temp = queue[0];
    }

    return array;
  }

  levelOrder(cb = null) {
    // 1st method
    return this.#levelOrderIteration(cb);
  }

  // left root right
  inOrder(cb = null) {
    const result = [];

    function recursion(node) {
      if (!node) return;

      recursion(node.left);

      if (cb) {
        cb(node);
      }

      result.push(node.value);
      recursion(node.right);
    }

    recursion(this.root);

    return result;
  }

  // root left right
  preOrder(cb = null) {
    const result = [];

    function recursion(node) {
      if (node) {
        if (cb) {
          cb(node);
        }

        result.push(node.value);
        recursion(node.left);
        recursion(node.right);
      }
    }
    recursion(this.root);

    return result;
  }

  // left right root
  postOrder(cb = null) {
    const result = [];

    function recursion(node) {
      if (node) {
        recursion(node.left);
        recursion(node.right);

        if (cb) cb(node);

        result.push(node.value);
      }
    }

    recursion(this.root);

    return result;
  }

  height(node) {
    if (!node) return -1;

    let heightLeft = this.height(node.left);
    let heightRight = this.height(node.right);

    return Math.max(heightLeft, heightRight) + 1;
  }

  depth(node) {
    if (node === null) return 0;

    const leftDepth = this.depth(node.left);
    const rightDepth = this.depth(node.right);

    return Math.max(leftDepth, rightDepth) + 1;
  }

  #checkBalanced(root) {
    if (!root) return true;

    const leftDepth = this.depth(root.left);
    const rightDepth = this.depth(root.right);

    const heightDiff = Math.abs(leftDepth - rightDepth);
    if (heightDiff > 1) {
      return false;
    }

    return this.#checkBalanced(root.left) && this.#checkBalanced(root.right);
  }

  isBalanced() {
    if (!this.root) return true;

    return this.#checkBalanced(this.root);
  }

  rebalance() {
    const treeArr = this.levelOrder();

    this.root = this.buildTree(treeArr);
  }
}

module.exports = BST;
