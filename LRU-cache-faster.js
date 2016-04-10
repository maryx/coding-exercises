// #4
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
        cacheCount: 0,   // Where we are in overriding values in the cache
        maxSize: 0,      // Max size of data store

        // This updates recent-ness for updating an existing id. It happens in O(n) :(
        // Finds where the id is in the cache, and shift everything so that now it's in the most recent index.
        updateRecentExistingId: function(id) {
            var idIndex = this.cache.indexOf(id);

            // Only update cache count when the thing you're setting isn't already in first-recentness.
            if (idIndex !== id) {
                this.cacheCount = ((this.cacheCount + 1) % this.maxSize);

                var thing = this.cache.splice(idIndex, 1); // delete the old location of the id.
                console.log(thing);
                console.log(this.cache);
                this.cache.splice((this.cacheCount), 0, id); // reinsert the id as most recent
            }
        },

        // This updates recent-ness for adding in a non-existing id. It happens in O(1)
        updateRecent: function(id) {
            this.cache[this.cacheCount] = id;
            this.cacheCount = ((this.cacheCount + 1) % (this.maxSize));
        },

        // Returns val given the id. Updates recent-ness for that id.
        get: function(id) {
            console.log("Getting", id);
            if (this.data[id]) {
                this.updateRecentExistingId(id);
            }
            return this.data[id];
        },

        /* Sets id with value to data.
         * Updates recent-ness in cache.
         * Updates cacheCount.
         * If id is not in the list and the list is full, deletes the least recently used id
         * and then adds this one.
         */
        set: function(id, val) {
            console.log("Setting", id, "," , val);
            if (this.data[id]) {
                this.data[id] = val;
                this.updateRecentExistingId(id);
            } else {
                if (Object.keys(this.data).length >= (this.maxSize - 1)) {
                    // find the least used id, which is the one you will be overwriting.
                    var leastRecentId = this.cache[this.cacheCount % this.maxSize];
                    delete(this.data[leastRecentId]); // delete least used from data
                }
                this.data[id] = val;
                this.updateRecent(id);
            }
        },

        // Deletes exisiting cache and creates a new one with size = maxSize
        construct: function(maxSize) {
            this.data = {};
            this.cacheCount = 0;
            this.cache = [];
            this.maxSize = maxSize;
        },

        printKeys: function() {
            console.log(Object.keys(this.data).join(', '), '<-- Printed Keys');
        },
        
        printCache: function() {
            var recent = []; // make a copy of cache
            for (var i = 0; i < this.cache.length; i++) {
                recent.push(this.cache[i]);
            }
            
            var beginning = recent.slice(this.cacheCount);
            var end = recent.slice(0, this.cacheCount);
            recent = beginning.concat(end);

            console.log(recent.join(', '), '<-- Cache, from LEAST recently used to MOST recently used\n');
            console.log(this.cache.join(', '), '<-- Cache, the way it is stored');
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
console.log('b, c, d, a');

lru1.set('e', 3);
lru1.printKeys();
console.log('a, c, d, e');
lru1.printCache();
console.log('c, d, a, e');

lru1.set('a', 2);
lru1.printKeys();
console.log('a, c, d, e');
lru1.printCache();
console.log('c, d, e, a');

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
