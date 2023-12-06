class Tree {
  constructor(inputArray) {
    this.root = this.buildTree(inputArray);
  }

  buildTree(arr) {
    if (!arr.length) return null;
    const uniq = [...new Set(arr)]; // remove duplicates
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
    let currentNode = this.root;

    while (currentNode !== null) {
      if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          break;
        } else {
          currentNode = currentNode.right;
        }
      } else if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else if (value === currentNode.data) {
        break;
      }
    }
  }

  delete(value) {
    let currentNode = this.root;
    const q = [];

    while (currentNode !== null) {}
  }
}

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
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

  return;
};

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 3];

const tree = new Tree(array);

prettyPrint(tree.root);
