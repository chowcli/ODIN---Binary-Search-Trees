const BST = require("./BST");
const { prettyPrint } = require("./supportFnc");

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new BST(array);

prettyPrint(tree.root);
