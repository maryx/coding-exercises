// suppose we have a small matrix of size M1 by N1 columns, each value is an int
// and we also have a large matrix of size M2 by N2 where M2 >= M1 and N2 >= N1.
// write a function that returns true if and only if the smaller matrix is contained in the bigger one.
// how can this be optimized?

function isInMatrix(smallMatrix, largeMatrix) {
    if (!matrixValid(smallMatrix, largeMatrix)) {
        return false;
    }

    for (var i = 0; i < Math.max(1, (largeMatrix.length - smallMatrix.length)); i++) {
        for (var j = 0; j < Math.max(1, (largeMatrix[0].length - smallMatrix[0].length)); j++) {
            if (checkIfInMatrix(largeMatrix, smallMatrix, i, j)) {
                return true;
            }
        }
    }
    return false;
}

function checkIfInMatrix(largeMatrix, smallMatrix, i, j) {
    var keepGoing = true;
    for (var k = 0; k < smallMatrix.length; k++) { // starts checking the 2nd elt?
        if (keepGoing) {
            for (var l = 0; l < smallMatrix[0].length; l++) {
                //                console.log('large', largeMatrix[i + k][j + l]);
                //                console.log('small', smallMatrix[k][l]);
                if (largeMatrix[i + k][j + l] !== smallMatrix[k][l]) {
                    keepGoing = false;
                    break;
                }
            }
        }
    }
    return keepGoing;
}

// assuming we will be passed in arrays, and not stuff like strings.
function matrixValid(smallMatrix, largeMatrix) {
    if (smallMatrix.length < 1 || largeMatrix.length < 1) {
        return false;
    }

    var smallMatrixLength = smallMatrix[0].length;
    var largeMatrixLength = largeMatrix[0].length;
    if (smallMatrixLength > largeMatrixLength) {
        return false;
    }

    if (smallMatrix.length > 1) {
        for (var i = 1; i < smallMatrix.length; i++) {
            if (smallMatrix[i].length !== smallMatrixLength) {
                return false;
            }
        }
    }

    if (largeMatrix.length > 1) {
        for (i = 1; i < largeMatrix.length; i++) {
            if (largeMatrix[i].length !== largeMatrixLength) {
                return false;
            }
        }
    }

    return true;
}

var small1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
var big1 = [
    [0, 0, 0, 0, 0],
    [0, 1, 2, 3, 0],
    [0, 4, 5, 6, 0],
    [0, 7, 8, 9, 0],
    [0, 0, 0, 0, 0]
];
console.log(isInMatrix(small1, big1));

var small2 = [
    [0, 1],
    [0, 1]
];
var big2 = [
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0]
];
console.log(isInMatrix(small2, big2));

var small = [
    [0]
    ];
var big = [
    [0]
];
// idk technically the big matrix contains the small one??? should return true?
console.log(isInMatrix(small, big));

var small = [
    [1, 2],
    [3, 4]
];
var badBig = [
    [1, 2],
    [3, 4, 5]
];
console.log(isInMatrix(small, badBig));

var small = [
    [1, 2, ],
    [3, 4]
];
var badBig = [
    [0]
];
console.log(isInMatrix(small, badBig));
