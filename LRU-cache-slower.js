// the good-ol LRU cache problem:
// implement an LRU cache (least-recently-used).
// it exposes this API:
//   get(id), set(id, val), construct(max_items)
// if we are trying to set a new item when there are already max_items in the cache,
//  we drop the least-fresh (oldest, or least-recently-used entry) before adding new one.
// should be as efficient as possible in terms of runtime complexity

var LRUCache = function() {
    var lruCache = {
        data: {},        // Each value is stored as [id, val]
        cache: null,     // Cache keeps track of recent-ness
        maxSize: 0,      // Max size of data store

        // This updates recent-ness for adding in a non-existing id. It happens in O(n)
        updateRecent: function(id) {
            var index = this.cache.indexOf(id);
            if (index !== -1) {
                this.cache.splice(index, 1); // remove the id from cache
            } else if (this.cache.length >= this.maxSize) {
                this.cache.splice(0, 1); // remove the least recent from cache
            }
            this.cache.push(id); // add the id to end of cache
        },

        // Returns val given the id. Updates recent-ness for that id.
        get: function(id) {
            console.log("Getting", id);
            if (this.data[id]) {
                this.updateRecent(id);
            }
            return this.data[id];
        },

        /* Sets id with value to data.
         * Updates recent-ness in cache.
         * If id is not in the list and the list is full, deletes the least recently used id
         * and then adds this one.
         */
        set: function(id, val) {
            console.log("Setting", id, "," , val);
            this.data[id] = val;

            if (Object.keys(this.data).length > this.maxSize) {
                // find the least used id, which is the one you will be overwriting.
                var leastRecentId = this.cache[0];
                delete(this.data[leastRecentId]); // delete least used from data
            }

            this.updateRecent(id);
        },

        // Deletes exisiting cache and creates a new one with size = maxSize
        construct: function(maxSize) {
            this.data = {};
            this.cache = [];
            this.maxSize = maxSize;
        },

        printKeys: function() {
            console.log(Object.keys(this.data).join(', '), '<-- Printed Keys');
        },
        
        printCache: function() {
            console.log(this.cache.join(', '), '<-- Cache, from least recent to most recent');
        }
    };
    
    return lruCache;
};

var lru1 = new LRUCache();
lru1.construct(4);
lru1.set('a', 1);
lru1.set('b', 1);
lru1.set('c', 1);
lru1.set('d', 1);
lru1.printKeys();
lru1.printCache();

lru1.get('a');
lru1.printKeys();
console.log('a, b, c, d');
lru1.printCache();
console.log('b, c, d, a, from least recent to lost recent');

lru1.set('e', 3);
lru1.printKeys();
console.log('a, c, d, e');
lru1.printCache();
console.log('c, d, a, e, from least recent to lost recent');

lru1.set('a', 2);
lru1.printKeys();
console.log('a, c, d, e');
lru1.printCache();
console.log('c, d, e, a, from least recent to lost recent');

console.log('*********************************\n');
 

var lru = new LRUCache();
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
lru.printKeys(); // Should print all 9
console.log("a, b, c, d, e, f, g, h, i <-- Keys should be\n");
lru.printCache();
console.log("a, b, c, d, e, f, g, h, i <-- Cache should be\n");

// Test2: Setting works
lru.set('j', 10);
lru.printKeys(); // Should print all 9
console.log("b, c, d, e, f, g, h, i, j <-- Keys should be\n");
lru.printCache();
console.log("j, b, c, d, e, f, g, h, i <-- Cache should be\n");


// Test2.5: Setting again works
lru.set('j', 100);
lru.printKeys(); // Should print all 9
console.log("b, c, d, e, f, g, h, i, j <-- Keys should be\n");
lru.printCache();
console.log("j, b, c, d, e, f, g, h, i <-- Cache should be\n");

console.log("Getting j: ", lru.get('j'), "should be 100");
lru.printKeys(); // Should print all 9
console.log("b, c, d, e, f, g, h, i, j <-- Keys should be\n");
lru.printCache();
console.log("j, b, c, d, e, f, g, h, i <-- Cache should be\n");

// Test3: Overwriting works
lru.set('overwrite b', 9);
lru.set('overwrite c', 90);
lru.set('overwrite d', 900);

lru.printKeys();
console.log("e, f, g, h, i, j, overwrite b, overwrite c, overwrite d <-- Keys should be \n");

lru.printCache();
console.log("j, overwrite b, overwrite c, overwrite d, e, f, g, h, i <-- Keys should be\n");

// Test4: Getting should work.
lru.get('f');

lru.printKeys();
console.log("e, f, g, h, i, j, overwrite b, overwrite c, overwrite d (unchanged from Test3) <-- Keys should be\n");

lru.printCache();
console.log("j, overwrite b, overwrite c, overwrite d, f, e, g, h, i <-- Cache should be\n");

// Test5: Getting a bunch of times shouldn't clog up the cache
lru.get('j');
lru.get('j');
lru.get('j');
lru.get('j');

lru.printKeys();
console.log("e, f, g, h, i, j, overwrite b, overwrite c, overwrite d (unchanged from Test3) <-- Keys should be\n");

lru.printCache();
console.log("overwrite b, overwrite c, overwrite d, f, j, e, g, h, i <-- Cache should be\n");

// // Test5: Setting after a ton of gets should be fine...
// lru.set('potato', 123);
// lru.printKeys();
// console.log("f, g, h, i, j, overwrite b, overwrite c, overwrite d, potato <-- Keys should be\n");

// lru.printCache();
// console.log("overwrite b, overwrite c, overwrite d, f, j, potato, g, h, i <-- Cache should be\n");
