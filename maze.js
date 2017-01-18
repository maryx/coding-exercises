'use strict';

// Print a path from starting point to ending point.
const dne = {
    val: false,
    visited: true
};
const visitedSpot = 7; // using 7 to signify we visited the spot already
const startingR = 0;
const startingC = 0;

function findPath(maze, startingR, startingC, endingR, endingC) {
    let currR = startingR;
    let currC = startingC;
    let path = [];
    let visited = copyArray(maze);

    while (!(currR === endingR && currC === endingC)) {
        const left = getLeft(currR, currC, maze, visited);
        const right = getRight(currR, currC, maze, visited);
        const up = getUp(currR, currC, maze, visited);
        const down = getDown(currR, currC, maze, visited);

        path.push([currR, currC]);
        visited[currR][currC] = true;
        maze[currR][currC] = visitedSpot;

        if (left.val === 0 && !left.visited) {
            maze[left.coordR][left.coordC] = visitedSpot;
            currR = left.coordR;
            currC = left.coordC;
        } else if (right.val === 0 && !right.visited) {
            maze[right.coordR][right.coordC] = visitedSpot;
            currR = right.coordR;
            currC = right.coordC;
        } else if (up.val === 0 && !up.visited) {
            maze[up.coordR][up.coordC] = visitedSpot;
            currR = up.coordR;
            currC = up.coordC;
        } else if (down.val === 0 && !down.visited) {
            maze[down.coordR][down.coordC] = visitedSpot;
            currR = down.coordR;
            currC = down.coordC;
        } else {
            if (path.length === 0) {
                console.log('\n*** Results ***');
                console.log('Maze');
                console.log(maze);
                console.log('No path from starting to ending')
                return;
            }
            path.pop();
            const goBackTo = path.pop();
            if (goBackTo === undefined) {
                console.log('\n*** Results ***');
                console.log('Maze');
                console.log(maze);
                console.log('No path from starting to ending')
                return;
            }
            currR = goBackTo[0];
            currC = goBackTo[1];
        }
    }
    console.log('\n*** Results ***');
    console.log('Maze');
    console.log(maze);
    console.log('Path');
    path.push([endingR, endingC]);
    console.log(path);
    return path;
}

function getLeft(r, c, maze, visited) {
    if (c === 0) {
        return dne;
    }
    return {
        coordR: r,
        coordC: c - 1,
        val: maze[r][c - 1],
        visited: visited[r][c - 1]
    };
}

function getRight(r, c, maze, visited) {
    if (c > maze.length - 2) {
        return dne;
    }
    return {
        coordR: r,
        coordC: c + 1,
        val: maze[r][c + 1],
        visited: visited[r][c + 1]
    };
}

function getUp(r, c, maze, visited) {
    if (r === 0) {
        return dne;
    }
    return {
        coordR: r - 1,
        coordC: c,
        val: maze[r - 1][c],
        visited: visited[r - 1][c]
    };
}

function getDown(r, c, maze, visited) {
    if (r > maze.length - 2) {
        return dne;
    }
    return {
        coordR: r + 1,
        coordC: c,
        val: maze[r + 1][c],
        visited: visited[r + 1][c]
    };
}

function copyArray(maze) {
    let copy = [];
    for (let row of maze) {
        let rowCopy = [];
        for (let col of row) {
            rowCopy.push(false);
        }
        copy.push(rowCopy);
    }
    return copy;
}

// function move(direction, path, visited, maze, currR, currC) {
//     if (!direction.visited) {
//         maze[direction.coordR][direction.coordC] = 7;
//     }
// }

/* ********* TESTS ********* */
let maze = [
    [0, 1, 1, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 0, 1]
];
let endingR = 0;
let endingC = 0;
findPath(maze, startingR, startingC, endingR, endingC);
console.log('[ [ 0, 0 ] ] <-- should be this');

endingR = 5;
endingC = 0;
findPath(maze, startingR, startingC, endingR, endingC);
console.log('[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ] ] <-- should be this')

maze = [
    [0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 0, 1]
];
endingR = 5;
endingC = 0;
findPath(maze, startingR, startingC, endingR, endingC);
console.log('[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ] ] <-- should be this')

maze = [
    [0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 1]
];
endingR = 5;
endingC = 1;
findPath(maze, startingR, startingC, endingR, endingC);
console.log('[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 5, 1 ] ] <-- should be this')

maze = [
    [0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 1]
];
endingR = 5;
endingC = 3;
findPath(maze, startingR, startingC, endingR, endingC);
console.log('[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 4, 3 ], [ 5, 3 ] ] <-- should be this')

maze = [
    [0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 1, 0]
];
endingR = 5;
endingC = 4;
findPath(maze, startingR, startingC, endingR, endingC);
console.log('No path <-- should be this')
