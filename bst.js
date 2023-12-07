class Tree {
  constructor(inputArray) {
    this.root = this.buildTree(inputArray);
  }

  buildTree(arr) {
    if (!arr.length) return null;

    const mid = Math.round(arr.length / 2 - 1);
    const leftArray = arr.slice(0, mid);
    const rightArray = arr.slice(mid + 1);
    const midValue = arr[mid];

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

  delete(value, node = this.root, parent = null) {
    if (node === null) {
      console.log("Error: value not found in tree");
      return node;
    }

    if (value > node.data) {
      this.delete(value, node.right, node);
    } else if (value < node.data) {
      this.delete(value, node.left, node);
    } else if (value === node.data) {
      // case no children
      if (node.left === null && node.right === null) {
        if (parent.right.data === value) {
          parent.right = null;
        } else {
          parent.left = null;
        }
      }

      // case one child
      else if (node.left === null && node.right !== null) {
        const successor = node.right;
        node.data = successor.data;
        node.right = null;
      } else if (node.right === null && node.left !== null) {
        const successor = node.left;
        node.data = successor.node;
        node.left = null;
      }

      // case both children
      else if (node.left !== null && node.right !== null) {
        const successor = this._minValueNode(node.right);
        node.data = successor.data;
        this.delete(successor.data, node.right, node);
      }
    }
  }

  _minValueNode(node) {
    let currentNode = node;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value === currentNode.data) {
        return currentNode;
      }
    }

    throw new Error("Data not in tree");
  }

  // TODO: Make order's accept callbacks
  inorder(node = this.root, callback = null, array = []) {
    if (node !== null) {
      if (callback && typeof callback === "function") {
        callback(node);
      }
      this.inorder(node.left, callback, array);
      array.push(node);
      this.inorder(node.right, callback, array);
    }

    if (callback === null) {
      return array;
    }
  }

  preorder(node = this.root, callback = null, array = []) {
    if (node !== null) {
      if (callback && typeof callback === "function") {
        callback(node);
      }
      array.push(node);
      this.preorder(node.left, callback, array);
      this.preorder(node.right, callback, array);
    }

    if (callback === null) {
      return array;
    }
  }

  postorder(node = this.root, callback = null, array = []) {
    if (node !== null) {
      if (callback && typeof callback === "function") {
        callback(node);
      }
      this.postorder(node.left, callback, array);
      this.postorder(node.right, callback, array);
      array.push(node);
    }

    if (callback === null) {
      return array;
    }
  }

  // TODO
  height(node) {}
  depth(node) {}
  isBalanced(root = this.root) {}
  rebalance() {}
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

function generateArray({ nums, min = 0, range = 100 }) {
  let array = [];

  for (let i = 0; i < nums; i++) {
    const randomNumber = Math.round(Math.random() * range + min);
    array.push(randomNumber);
  }

  array = [...new Set(array)];
  array = mergesort(array);

  return array;
}

function mergesort(array) {
  if (array.length === 1) {
    return array;
  } else {
    const left = array.slice(0, array.length / 2);
    const right = array.slice(array.length / 2);

    const sortedLeft = mergesort(left);
    const sortedRight = mergesort(right);

    return merge(sortedLeft, sortedRight);
  }
}

function merge(left, right) {
  const sortedArray = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArray.push(left.shift());
    } else {
      sortedArray.push(right.shift());
    }
  }

  while (left.length) {
    sortedArray.push(left.shift());
  }

  while (right.length) {
    sortedArray.push(right.shift());
  }

  return sortedArray;
}

const array = generateArray({ nums: 10, min: 0, range: 100 });

const tree = new Tree(array);

const inorderArray = tree.inorder();
const preorderArray = tree.preorder();
const postorderArray = tree.postorder();

prettyPrint(tree.root);

const button = document.createElement("button");
button.textContent = "Click to console log the current tree";
button.addEventListener("click", (e) => {
  console.clear();
  prettyPrint(tree.root);
});

document.body.append(button);
