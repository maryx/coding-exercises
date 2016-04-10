// #4
// the good-ol LRU cache problem:
// implement an LRU cache (least-recently-used).
// it exposes this API:
//   get(id), set(id, val), construct(max_items)
// if we are trying to set a new item when there are already max_items in the cache,
//  we drop the least-fresh (oldest, or least-recently-used entry) before adding new one.
// should be as efficient as possible in terms of runtime complexity

var LRUCache = function() {
    
    /* Each value is stored as {id, val}.
     * Most recently used will be in the last place.
     * Least recently used will be in the first place.
     */
    this.cache = [];
    this.max_size = 0;

    // Returns val given the id. Then pushes this one to be the most recently used.
    function get(id) {
        for (var i = 0; i < this.cache.length; i++) {
            if (id === this.cache[i][0]) {
                var val = this.cache[i][1];
                this.cache.pop(i).push(); // Pops it out of wherever it was previously and makes it most recent
                return val;
            }
        }
        console.log("id was not found");
        return null;
    }

    /* Sets id with value.
     * If id is not in the list and the list is full, deletes the least recently used id
     * and then adds this one.
     */
    function set(id, val) {
        if (get(id)) { // the get() causes the item to be the last element in the array
            this.cache[-1][1] = val;
        } else {
            if (this.cache.length >= this.max_size) {
                this.cache.pop(); // removes the least used
            }
            this.cache.push([id, val]); // adds to end of array
        }
    }
    
    // Deletes exisiting cache and creates a new one with size = max_items
    function construct(max_items) {
        this.cache = [];
        this.max_size = max_items;
    }
}

module.exports = LRUCache();
