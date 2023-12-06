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
          return (parent.right = null);
        } else {
          return (parent.left = null);
        }
      }

      // case one child
      else if (node.left === null && node.right !== null) {
        const successor = node.right;
        node.data = successor.data;
        return (node.right = null);
      } else if (node.right === null && node.left !== null) {
        const successor = node.left;
        node.data = successor.node;
        return (node.left = null);
      }

      // case both children
      else if (node.left !== null && node.right !== null) {
        const successor = this._minValueNode(node.right);
        node.data = successor.data;
        return this.delete(successor.data, node.right, node);
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

  inorder(node = this.root, arr = []) {
    let array = arr;
    if (node !== null) {
      this.inorder(node.left, array);
      array.push(node.data);
      this.inorder(node.right, array);
    }

    return array;
  }

  preorder(node = this.root, arr = []) {
    let array = arr;
    if (node !== null) {
      array.push(node.data);
      this.preorder(node.left, array);
      this.preorder(node.right, array);
    }

    return array;
  }

  postorder(node = this.root, arr = []) {
    let array = arr;
    if (node !== null) {
      this.postorder(node.left, array);
      this.postorder(node.right, array);
      array.push(node.data);
    }

    return array;
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

const button = document.createElement("button");
button.textContent = "Click to console log the current tree";
button.addEventListener("click", (e) => {
  prettyPrint(tree.root);
});

document.body.append(button);
