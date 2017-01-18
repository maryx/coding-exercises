const a = [2, 3, 5]
const b = [1, 2, 17, 23]

function merge(arrA, arrB) {
    let arrBi = 0;
    let output = [];
    for (let i = 0; i < arrA.length; i++) {
        while (arrA[i] > arrB[arrBi]) {
            output.push(arrB[arrBi]);
            arrBi += 1;
        }
        output.push(arrA[i]);
    }
    if (arrBi < arrB.length) {
        output = output.concat(arrB.slice(arrBi, arrB.length));
    }
    console.log(output);
}

merge(a, b);
merge(b, a);
