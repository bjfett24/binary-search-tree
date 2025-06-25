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

    insert(value) {
       this.root = this.insertNode(this.root, value);
    };

    insertNode(node, value) {
        if (node === null) {
            return new Node(value);
        } else if (value === node.data) {
            return node;
        } else if (value < node.data) {
            node.left = this.insertNode(node.left, value);
        } else {
            node.right = this.insertNode(node.right, value);
        }

        return node;
    }

    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    };

    deleteNode(node, value) {
        if (node === null) {
            return node;
        }
        
        if (value < node.data) {
            node.left = this.deleteNode(node.left, value);
            return node;
        } else if (value > node.data) {
            node.right = this.deleteNode(node.right, value);
            return node;
        } else if (value === node.data) {
            if (node.right === null) {
                return node.left;
            } else if (node.left === null) {
                return node.right;
            } else if (node.left !== null && node.right !== null) {
                let tempNode = this.findMin(node.right);
                node.data = tempNode.data;
                // console.log(node);
                node.right = this.deleteNode(node.right, tempNode.data);
                return node;
            }
        }
    };

    findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    find(value) {
        return this.findNode(this.root, value);
    };

    findNode(node, value) {
        if (node === null) {
            return node;
        }

        if (node.data < value) {
            return this.findNode(node.right, value);
        } else if (node.data > value) {
            return this.findNode(node.left, value);
        } else if (node.data === value) {
            return node;
        }
    }

    levelOrder(callback) {
        if (callback == undefined) {
            throw new Error('Argument must be passed for callback function')
        }
        const node = this.root;
        if (node === null) return;

        const queue = [];
        queue.push(node);

        while (queue.length > 0) {
            let current = queue.at(0);
            current.data = callback(current.data);
            if (current.left !== null) {
                queue.push(current.left)
            } 
            if (current.right !== null) {
                queue.push(current.right);
            }
            queue.shift();
        }

    }
    
    
    inOrder(callback) {
        if (callback == undefined) throw new Error('Argument must be passed for callback function');
        else this.inOrderNode(this.root, callback);
    };

    inOrderNode(node, callback) {
        if (node == null) return;
        this.inOrderNode(node.left, callback); 
        node.data = callback(node.data);
        this.inOrderNode(node.right, callback);
    }

    preOrder(callback) {
        if (callback == undefined) throw new Error('Argument must be passed for callback function');
        else this.preOrderNode(this.root, callback);
    };

    preOrderNode(node, callback) {
        if (node == null) return;
        node.data = callback(node.data);
        this.preOrderNode(node.left, callback);
        this.preOrderNode(node.right, callback);
    };

    postOrder(callback) {
        if (callback == undefined) throw new Error('Argument must be passed for callback function');
        else this.postOrderNode(this.root, callback);
    };

    postOrderNode(node, callback) {
        if (node == null) return;
        this.postOrderNode(node.left, callback);
        this.postOrderNode(node.right, callback);
        node.data = callback(node.data);
    };

    height(value) {        
        if (this.find(value) == null) {
            return null;
        } else {
            return this.heightNode(this.find(value));
        }
    }

    heightNode(node) {
        if (node.left === null && node.right === null) {
            return 0;
        } else if (node.left === null) {
            return this.heightNode(node.right) + 1;
        } else if (node.right === null) {
            return this.heightNode(node.left) + 1;
        } else {
            const leftHeight = this.heightNode(node.left);
            const rightHeight = this.heightNode(node.right);
            if (leftHeight >= rightHeight) {
                return leftHeight + 1;
            } else {
                return rightHeight + 1;
            }
        }
    }
    

    depth(value) {
        if (this.find(value) == null) {
            return null;
        } else {
            return this.heightNode(this.find(value));
        }
    };

    depthNode(node) {

    };

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
myTree.insert(1);
myTree.deleteItem(3);
myTree.deleteItem(4);
myTree.insert(2);
myTree.insert(3);
myTree.insert(4);
myTree.insert(9);
console.log(myTree.root);
prettyPrint(myTree.root);
myTree.levelOrder(double);
myTree.preOrder(add5);
myTree.postOrder(square);
console.log(myTree.root);
prettyPrint(myTree.root);




function double(num) {
    return num * 2;
}

function add5(num) {
    return num + 5;
}

function absSub10(num) {
    return Math.abs(num - 10);
}

function square(num) {
    return num ** 2;
}




