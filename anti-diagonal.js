
// time: 30-40 min. language: javascript
// write a function that traverses a rectangular array and outputs the // elements in anti-diagonal order.
// e.g. input = [[a, b, c, d], [e, f, g, h], [i, j, k, l]]
// output = a b e c f i d g j h k l
function antiDiagonal(input) {
    let output = '';
    // get upper left triangle
    for (let col = 0; col < input[0].length; col++) {
        let r = 0;
        let c = col;
        output += getDiagonal(r, c, input)
    }
  // get bottom triangle
    for (let row = 1; row < input.length; row++) {
        let r = row;
        let c = input[0].length - 1;
        output += getDiagonal(r, c, input)
    }
    return output;
}

function getDiagonal(r, c, input) {
    let output = '';
    while(c >= 0 && r < input.length) {
        output = output + input[r][c] + ' ';
        c -= 1;
        r += 1;
    }
    return output
}

testA = [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l']]
console.log(antiDiagonal(testA), ' <-- my func')
outputA = 'a b e c f i d g j h k l';
console.log(outputA);

// unrelated
const easy = '()[]{}<>'
const medium = '({[<>]})'
const bad = '<(>)'
const hard = '(((((((([]))))))))'
const maybe = '((([]((((([]))))))))'
