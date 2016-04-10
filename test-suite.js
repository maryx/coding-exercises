// typical javascript test syntax might look like:
describe('Verify basic functionality', function() {
    it('should pass when conditions match', function() {
        expect(true).toEqual(true);
        expect(1).toEqual(1);
        expect('hi').toEqual('hi');
    });
    it('should fail when conditions do not match', function() {
        expect(true).toEqual(false);
    });
});

// expected output:
// Pass: Verify basic functionality should pass when conditions match
// Fail: Verify basic functionality should fail when conditions do not match
// 1 of 2 passed

function describe(describeMessage, itTests) {
    this.passes = 0;
    this.describeMessage = describeMessage;
    this.totalTests = 0;
    itTests.call(this, passes);
    console.log(passes + ' of ' + this.totalTests + ' total expect() tests passed');
}

function it(itMessage, expectTests) {
    this.itMessage = itMessage;
    expectTests.call(this, passes);
}

function expect(value) {
    this.totalTests += 1;
    var testObject = new TestObject();
    var message = this.describeMessage + ' ' + this.itMessage;
    return testObject.create(value, message);
}

function TestObject() {
    this.value = null;
    this.message = null;

    this.create = function(value, message) {
        this.value = value;
        this.message = message;
        return this;
    };
    this.toEqual = function(value) {
        if (this.value === value) {
            console.log('Pass: ' + this.message);
            passes += 1;
        } else {
            console.log('Fail: ' + this.message);
        }
    };
}
