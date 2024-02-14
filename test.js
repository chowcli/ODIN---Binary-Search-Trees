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
