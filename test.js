const BST = require("./BST");
const { prettyPrint } = require("./supportFnc");

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new BST(array);
tree.insert(10);
tree.insert(0);
tree.insert(29);
tree.insert(20);
tree.insert(15);

prettyPrint(tree.root);
console.log("\n");

tree.delete(9);
tree.delete(6345);
tree.delete(0);
tree.delete(10);
tree.delete(8);
prettyPrint(tree.root);
console.log("\n");

console.log(tree.find(324));
console.log(tree.find(0));
console.log(tree.find(3));
console.log(tree.find(9));
console.log("\n");

const cb = node => {
  console.log(node.value);
};
console.log(tree.levelOrder(cb));
