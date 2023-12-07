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
        if (parent.right !== null && parent.right.data === value) {
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

  inorder(callback = null, node = this.root, array = []) {
    if (node !== null) {
      this.inorder(callback, node.left, array);

      if (callback && typeof callback === "function") {
        callback(node);
      }
      array.push(node.data);

      this.inorder(callback, node.right, array);
    }
    if (!callback) {
      return array;
    }
  }

  preorder(callback = null, node = this.root, array = []) {
    if (node !== null) {
      if (callback && typeof callback === "function") {
        callback(node);
      }
      array.push(node.data);

      this.preorder(callback, node.left, array);
      this.preorder(callback, node.right, array);
    }

    if (!callback) {
      return array;
    }
  }

  postorder(callback = null, node = this.root, array = []) {
    if (node !== null) {
      this.postorder(callback, node.left, array);
      this.postorder(callback, node.right, array);

      array.push(node.data);
      if (callback && typeof callback === "function") {
        callback(node);
      }
    }

    if (!callback) {
      return array;
    }
  }

  levelorder(node = this.root, callback = null, returnedArray = [], q = []) {
    if (node !== null) {
      if (callback && typeof callback === "function") {
        callback(node);
      }

      // adds current node to the returning array
      returnedArray.push(node);
      // add current node and its children to queue
      if (node.left !== null) {
        q.push(node.left);
      }
      if (node.right !== null) {
        q.push(node.right);
      }

      const nextNode = q.shift();
      if (nextNode !== undefined) {
        this.levelorder(nextNode, callback, returnedArray, q);
      }

      if (!callback) {
        return returnedArray;
      }
    }
  }

  height(node = this.root) {
    if (node === null) {
      return -1;
    }
    let heightLeft = this.height(node.left);
    let heightRight = this.height(node.right);

    if (heightLeft > heightRight) {
      return heightLeft + 1;
    } else {
      return heightRight + 1;
    }
  }

  depth(value) {
    let currentNode = this.root;
    let count = -1;

    while (currentNode !== null) {
      count++;
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value === currentNode.data) {
        return count;
      }
    }

    throw new Error("Data not in tree");
  }

  isBalanced() {
    const left = this.height(this.root.left);
    const right = this.height(this.root.right);
    const abs = Math.abs(left - right);

    if (abs > 1) {
      return false;
    } else {
      return true;
    }
  }
  rebalance() {
    let arr = this.inorder();
    this.root = this.buildTree(arr);
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

// functions that aren't related to BST, but make it easier to troubleshoot
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

tree.add(64);
tree.delete(64);
