  // implement function promiseAnd(promise1, promise2) that resolves when both args have resolved.
  // standard es5 promises.
function startAsyncJob1() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('promise 1 timeout');
            resolve('hi');
        }, 2000);
    })
}

function startAsyncJob2() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('promise 2 timeout');
            resolve('pumpkin');
        }, 1200);
    })
}

function promiseAnd(promise1, promise2) {
    return new Promise(function(resolve, reject) {
        promise1.then(() => {
            promise2.then(() => {
                resolve();
            });
        })
    })
}

function promiseOr(promise1, promise2) {
    return new Promise(function(resolve, reject) {
        promise1.then(() => {
            resolve()
        })
        promise2.then(() => {
            resolve()
        })
    })
}

function promiseOrWithRace(promise1, promise2) {
    let p1 = new Promise(function(resolve, reject) {
        promise1.then(() => {
            console.log('resolving promise 1');
            resolve();
        });
    });
    let p2 = new Promise(function(resolve, reject) {
        promise2.then(() => {
            console.log('resolving promise 2');
            resolve();
        });
    });
    return Promise.race([p1, p2]).then(function() {
        console.log('?')
    })
}

const job1 = startAsyncJob1();
const job2 = startAsyncJob2();

console.log(job1);
console.log(job2);

promiseOr(job1, job2).then(function() {
    console.log('job1 or job2 finished.');
});

  // promiseAnd(job1, job2).then(function() {
  //   console.log('job1 and job2 both finished.');
  // });
