const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.top = null;
  }

  root() {
    return this.top;
  }

  add(data) {
    const newNode = new Node(data);

    const addNode = (node, data) => {
      if (!node) {
        return newNode;
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }

      return node;
    };

    this.top = addNode(this.top, data);
  }

  has(data) {
    const isPresentNode = (node, data) => {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }

      if (data < node.data) {
        return isPresentNode(node.left, data);
      } else {
        return isPresentNode(node.right, data);
      }
    };

    return isPresentNode(this.top, data);
  }

  find(data) {
    const findNode = (node, data) => {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        return findNode(node.left, data);
      } else {
        return findNode(node.right, data);
      }
    };

    return findNode(this.top, data);
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) {
        return null;
      }

      if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        } else if (!node.left) {
          node = node.right;
          return node;
        } else if (!node.right) {
          node = node.left;
          return node;
        } else {
          let minRight = node.right;
          while (minRight.left) {
            minRight = minRight.left;
          }
          node.data = minRight.data;
          node.right = removeNode(node.right, minRight.data);
          return node;
        }
      }
    };

    this.top = removeNode(this.top, data);
  }

  min() {
    if (!this.top) {
      return null;
    }

    let node = this.top;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.top) {
      return null;
    }

    let node = this.top;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
