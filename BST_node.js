const Node = (data, leftNode = null, rightNode = null) => {
  return {
    value: data,
    left: leftNode,
    right: rightNode,
  };
};

module.exports = Node;
