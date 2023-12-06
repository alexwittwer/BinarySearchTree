class Tree {
  constructor(inputArray) {
    this.root = this.buildTree(inputArray);
  }

  buildTree(arr) {
    if (!arr.length) return;
    const uniq = [...new Set(arr)] // remove duplicates
    const cp = uniq.sort(); 
    
    const mid = Math.round(cp.length / 2 - 1);
    const leftArray = cp.slice(0, mid);
    const rightArray = cp.slice(mid + 1);
    const midValue = cp[mid];

    const root = new Node(midValue);
    root.left = this.buildTree(leftArray);
    root.right = this.buildTree(rightArray);

    return root;
  }

  add(value) {
      // adds a value to the tree
  }
}

class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
