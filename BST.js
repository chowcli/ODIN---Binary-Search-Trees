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
}

module.exports = BST;
