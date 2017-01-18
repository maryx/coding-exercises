// 1. In JavaScript, write a function that takes an array as input that can contain both ints and more arrays (which can also contain an array or int) and return the flattened array. ex. [1, [2, [ [3, 4], 5], 6]] =[1, 2, 3, 4, 5, 6]


function flatten(array) {
    return flattenArray([], array)
}

function flattenArray(parentOutput, array) {
    for (let i = 0; i < array.length; i++) {
        const itemAtArray = array[i];
        if (Array.isArray(itemAtArray)) {
            parentOutput = parentOutput.concat(flattenArray([], itemAtArray));
        } else {
            parentOutput.push(itemAtArray);
        }
    }
    return parentOutput;
}

console.log(flatten([1, [2, 3], 4]))
console.log(flatten([1, [2, [ [3, 4], 5], 6]]))
