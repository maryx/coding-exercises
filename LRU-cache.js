// the good-ol LRU cache problem:
// implement an LRU cache (least-recently-used).
// it exposes this API:
//   get(id), set(id, val), construct(max_items)
// if we are trying to set a new item when there are already max_items in the cache,
// we drop the least-fresh (oldest, or least-recently-used entry) before adding new one.
// should be as efficient as possible in terms of runtime complexity

'use strict';

function LinkedList() {
    this.head = null; // Most recent
    this.tail = null; // Least recent
    this.length = 0;

    this.append = (node) => {
        if (this.head === null) {
            this.head = node;
            this.tail = node;
            node.prev = null;
            node.next = null;
        } else { // Append to head
            if (this.tail.id === node.id) {
                this.tail = node.prev;
            }
            let oldHeadNode = this.head; // Get previously most recent head
            oldHeadNode.prev = node;
            node.next = oldHeadNode;
            this.head = node;
        }
        this.length += 1;
    };

    this.remove = (node) => {
        if (node.prev !== null) {
            node.prev.next = node.next;
        }
        if (node.next !== null) {
            node.next.prev = node.prev;
        }
        if (this.tail.id === node.id) {
            this.tail = node.prev;
        }
        if (this.head.id === node.id) {
            this.head = node.next;
        }
        this.length -= 1;
        return node;
    };

    this.getLength = () => {
        return this.length;
    }

    /* This updates recent-ness for updating an existing id.
       Takes out existing item. Inserts it into HEAD.
       Only update when the id you're grabbing isn't already HEAD.
    */
    this.moveToTop = (node) => {
        if (this.head.id !== node.id) {
            this.append(this.remove(node))
        }
    };

    this.print = () => {
        let recent = []; // make a copy of cache in array form
        let node = this.head;
        while (node !== null) {
            recent.push(node.id);
            node = node.next;
        }
        console.log(recent.join(', '), '<-- cache, from MOST recently used to LEAST recently used');
    };

}
function Node(id, val) {
    this.id = id;
    this.val = val;
    this.next = null; // 'less recent'
    this.prev = null; // 'more recent'
}

function LRUCache() {
    this.lookup = null; // Each value is stored as {id, Node}
    this.cache = null; // Cache keeps track of recent-ness. Most recent first.
    this.maxSize = 0; // Max size of data store

    /* Input: id
       Output: val
    */
    this.get = (id) => {
        console.log('\nGetting', id);
        let node = this.lookup[id];
        if (node) {
            this.cache.moveToTop(node);
            console.log(node.val);
            return node.val;
        }
        console.log('ID did not exist');
        return 'ID did not exist';
    };

    /* Input: id and val
       Output: none
       If id is not in the list and the list is full, deletes
       the least recently used id and then adds this one.
    */
    this.set = (id, val) => {
        console.log('\nSetting', id, ',' , val);
        let node = this.lookup[id];
        if (node) { // Setting existing id. Size of cache does not change.
            node.val = val;
        } else { // Setting new id. Size of cache may change.
            if (this.cache.getLength() === this.maxSize) {
                let nodeToDelete = this.cache.tail;
                this.cache.remove(nodeToDelete);
                delete(this.lookup[nodeToDelete.id]);
            }
            // Add new Node
            node = new Node(id, val); // newHeadNode
            this.cache.append(node);
            this.lookup[id] = node;
            this.cache.moveToTop(node);
        }
        this.cache.moveToTop(node);
    };

    // Deletes exisiting cache and creates a new one with size = maxSize
    this.construct = (maxSize) => {
        this.lookup = {};
        this.cache = new LinkedList();
        this.maxSize = maxSize;
    };

    this.printCache = () => {
        this.cache.print();
    };
};

// let lru1 = new LRUCache();
// lru1.construct(4);
// lru1.set('a', 1);
// lru1.set('b', 1);
// lru1.set('c', 1);
// lru1.set('d', 1);
// lru1.printCache();

// lru1.get('a');
// lru1.printCache();
// console.log('a, d, c, b');

// lru1.set('d', 2);
// lru1.printCache();
// console.log('d, a, c, b');

// lru1.set('e', 3);
// lru1.printCache();
// console.log('e, d, a, c');

// lru1.set('c', 4);
// lru1.printCache();
// console.log('c, e, d, a');


// console.log('*********************************\n');

let lru = new LRUCache();
lru.construct(9);

// Test1: Simple case works
lru.set('a', 1);
lru.set('b', 2);
lru.set('c', 3);
lru.set('d', 4);
lru.set('e', 5);
lru.set('f', 6);
lru.set('g', 7);
lru.set('h', 8);
lru.set('i', 9);
lru.printCache();
console.log('i, h, g, f, e, d, c, b, a <-- Cache should be\n');

// Test2: Setting works
lru.set('j', 10);
lru.printCache();
console.log('j, i, h, g, f, e, d, c, b <-- Cache should be\n');


// Test2.5: Setting again works
lru.set('j', 100);
lru.printCache();
console.log('j, i, h, g, f, e, d, c, b <-- Cache should be\n');

console.log('Getting j: ', lru.get('j'), 'should be 100');
lru.printCache()
console.log('j, i, h, g, f, e, d, c, b <-- Cache should be\n');

// Test3: Overwriting works
lru.set('overwrite b', 9);
lru.printCache();
console.log('overwrite b, j, i, h, g, f, e, d, c <-- Cache should be\n');

lru.set('overwrite c', 90);
lru.printCache();
console.log('overwrite c, overwrite b, j, i, h, g, f, e, d <-- Cache should be\n');

lru.set('overwrite d', 900);
lru.printCache();
console.log('overwrite d, overwrite c, overwrite b, j, i, h, g, f, e <-- Cache should be\n');

// Test4: Getting should work.
lru.get('f');
lru.printCache();
console.log('f, overwrite d, overwrite c, overwrite b, j, i, h, g, e <-- Cache should be\n');

// Test5: Getting a bunch of times shouldn't clog up the cache
lru.get('j');
lru.get('j');
lru.get('j');
lru.get('j');
lru.printCache();
console.log('j, f, overwrite d, overwrite c, overwrite b, i, h, g, e <-- Cache should be\n');

// Test5: Setting after a ton of gets should be fine...
lru.set('potato', 123);
lru.printCache();
console.log('potato, j, f, overwrite d, overwrite c, overwrite b, i, h, g <-- Cache should be\n');
