const BST = require("./BST");
const { prettyPrint } = require("./supportFnc");

function randomNumArr() {
  const arr = [];

  for (let i = 0; i < 15; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }

  return arr;
}

function randomInsert(bst) {
  for (let i = 0; i < 10; i++) {
    bst.insert(Math.floor(Math.random() * (1000 - 101 + 1)) + 101);
  }
}

const tree = new BST(randomNumArr());
prettyPrint(tree.root);
console.log("Build new BST");
console.log("Tree balance:", tree.isBalanced());
console.log("LevelOrder =>", tree.levelOrder());
console.log("PreOrder =>", tree.preOrder());
console.log("InOrder =>", tree.inOrder());
console.log("PostOrder =>", tree.postOrder(), "\n");

randomInsert(tree);
prettyPrint(tree.root);
console.log("After insert new value");
console.log("Tree balance:", tree.isBalanced(), "\n");

tree.rebalance();
console.log("After rebalance tree");
console.log("Tree balance:", tree.isBalanced());
console.log("LevelOrder =>", tree.levelOrder());
console.log("PreOrder =>", tree.preOrder());
console.log("InOrder =>", tree.inOrder());
console.log("PostOrder =>", tree.postOrder(), "\n");
prettyPrint(tree.root);
