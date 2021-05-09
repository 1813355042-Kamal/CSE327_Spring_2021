

const {stubAuth, loginDataActor} = require('./signup.js');

let calledWith = [];

stubAuth({
    createUserWithEmailAndPassword: (a, b) => {
        calledWith = [a, b];

        return new Promise((accept, reject) => {
            accept(true);
        });
    }
});

const promisified = (...args) => {
    return new Promise((accept, reject) => {
        loginDataActor(...args, (state, err) => {
            state ? accept() : reject(err);
        });
    });
} 

test('Ensure firebase use creation function is called.', async () => {
    await promisified("potato.tomato@biomb.com", "jkbnfw784tibwuibyirgfv");

    expect(calledWith[0]).toBe("potato.tomato@biomb.com");
    expect(calledWith[1]).toBe("jkbnfw784tibwuibyirgfv");
});
