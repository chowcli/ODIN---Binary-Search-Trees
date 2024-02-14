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
    const rootNode = this.#sortedArrToBST(sortArr);

    return rootNode;
  }

  #insertRecursion(root, value) {
    if (root === null) {
      root = Node(value);
      return root;
    }

    if (value < root.value) {
      root.left = this.#insertRecursion(root.left, value);
    }

    if (value > root.value) {
      root.right = this.#insertRecursion(root.right, value);
    }

    return root;
  }

  insert(value) {
    this.root = this.#insertRecursion(this.root, value);
  }

  delete(value) {}
}

module.exports = BST;
