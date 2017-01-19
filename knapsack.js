/*
   Given a bunch of items each with weight w and value v,
   selet the optimal list of items that minimizes w and maximizes v
   that will fit in your knapsack.
*/
'use strict';
const W = 30; // total capacity of knapsack

// Fills knapsack optimizing for total val of items while being under total weight W
function fillKnapsack(W, items) {
    let cache = new Cache();
    let totalVal = 0;
    let totalWeight = 0;

    if (W == 0 || items.length === 0) {
        return 'No items can be put in the knapsack.'
    }

    // Prune out items that are too heavy (>W)
    // O(n), n = number of items
    let possibleItems = [];
    for (let item of items) {
        if (item.weight <= W) {
            possibleItems.push(item);
        }
    }

    return tryFillKnapsack(cache, W, possibleItems);
}

function tryFillKnapsack(cache, W, items){
    let total = getValueOfItems(cache, items);
    let totalWeight = total.weight;
    let totalVal = total.val;
    let itemCombos = {};

    if (totalWeight > W) {
        // Delete off an item and see if the weight is within limit
        // n + (n-1) + (n-2) ... iterations of tryFillKnapsack each time you remove an item = O(n^2)
        // https://en.wikipedia.org/wiki/Triangular_number
        for (let i = 0; i < items.length; i++) {
            // Kick out item[i]
            const otherItems = items.slice(0, i).concat(items.slice(i+1));
            const optimalComboForSubsetOfItems = tryFillKnapsack(cache, W, otherItems);
            const weight = optimalComboForSubsetOfItems.weight;
            if (weight <= W && !itemCombos[weight]) {
                itemCombos[weight] = optimalComboForSubsetOfItems;
            }
        }
    } else {
        // This item combination is within the weight
        const currentCombo = getValueOfItems(cache, items);
        const weight = currentCombo.weight
        if (!itemCombos[weight]) {
            itemCombos[weight] = currentCombo;
        }
    }

    // return the optimal item combo
    // O(n)
    let weightMap = Object.keys(itemCombos);
    let optimalCombo = {val: 0};
    for (let weight of weightMap) {
        if (itemCombos[weight].val > optimalCombo.val) {
            optimalCombo = itemCombos[weight];
        }
    }
    return optimalCombo;
}

function getValueOfItems(cache, items) {
    let itemVals = null; //cache.get(items);
    // sum of item vals and weights already in cache
    if (itemVals) {
       return itemVals;
    }

    // calculate sum of item vals and weights; add to cache
    // O(n)
    let totalVal = 0;
    let totalWeight = 0;
    let ids = [];
    for (let item of items) {
        ids.push(item.id);
        totalVal += item.val;
        totalWeight += item.weight;
    }

    itemVals = {ids: ids, val: totalVal, weight: totalWeight};
    cache.put(items, itemVals);
    return itemVals;
}

function Cache() {
    this.itemCombinations = {};

    // O(1)
    this.get = (items) => {
        return this.itemCombinations[items];
    };

    // O(1)
    this.put = (items, itemVals) => {
        this.itemCombinations[items] = itemVals;
    };
}

let items = [
    { id: 1, val: 30, weight: 2 },
    { id: 2, val: 10, weight: 15 },
    { id: 3, val: 2, weight: 1 },
    { id: 4, val: 4, weight: 3 },
    { id: 5, val: 20, weight: 23 },
    { id: 6, val: 50, weight: 31 },
]
console.log(fillKnapsack(W, items));

items = [
    { id: 1, val: 50, weight: 30 },
    { id: 2, val: 25, weight: 15 },
    { id: 3, val: 26, weight: 15 },
    { id: 4, val: 4, weight: 3 },
    { id: 5, val: 20, weight: 23 },
    { id: 6, val: 50, weight: 31 },
]
console.log(fillKnapsack(W, items));

items = [
    { id: 1, val: 50, weight: 30 },
    { id: 2, val: 25, weight: 15 },
    { id: 3, val: 26, weight: 16 },
    { id: 4, val: 4, weight: 3 },
    { id: 5, val: 20, weight: 23 },
    { id: 6, val: 50, weight: 31 },
]
console.log(fillKnapsack(W, items));

items = [
    { id: 1, val: 50, weight: 30 },
    { id: 2, val: 25, weight: 15 },
    { id: 3, val: 26, weight: 16 },
    { id: 4, val: 4, weight: 3 },
    { id: 5, val: 20, weight: 23 },
    { id: 6, val: 50, weight: 30 },
]
console.log(fillKnapsack(W, items));
