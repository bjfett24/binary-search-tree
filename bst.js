class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = this.buildTree(this.arr);
    }

    buildTree(arr) {
        arr = new Set(arr);
        arr = [...arr];
        arr = arr.sort((a, b) => a - b);

        const start = 0;
        const end = arr.length - 1;

        if (start > end) return null;


        let mid = start + Math.floor((end - start) / 2);

        let root = new Node(arr[mid]);

        root.left = this.buildTree(arr.slice(start, mid));

        root.right = this.buildTree(arr.slice(mid + 1, end + 1));

        return root;

    };

    insert(value) {};

    deleteItem(value) {};

    find(value) {};

    levelOrder(callback) {};
    
    inOrder(callback) {};

    preOrder(callback) {};

    postOrder(callback) {};

    height(value) {};

    depth(value) {};

    isBalanced() {};

    rebalance() {};




}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };
  

const myTree = new Tree([0, 4, 3, 6, 5, 7, 8, 7, 6, 5, 4]);
console.log(myTree.root);