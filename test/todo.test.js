const { describe, it, before, afterEach, beforeEach } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');
const Todo = require('../src/todo');

describe('todo', () => {
    let sandbox;

    before(() => {
        sandbox = createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('#isValid', () => {
        it('should return invalid when creating an object without text', () => {
           const data = {
               text: '',
               when: new Date("2020-12-01")
           }
           const todo = new Todo(data);
           const result = todo.isValid();

           expect(result).to.be.not.ok;

        });
        it('should return invalid when creating an object using the "when" property invalid', () => {
            const data = {
                text: 'Hello Word',
                when: new Date("20-12-01")
            }
            const todo = new Todo(data);
            const result = todo.isValid();

            expect(result).to.be.not.ok;

        });
        it('should have "id", "text", "when" and "status" properties after creating object', () => {
            const data = {
                text: 'Hello Word',
                when: new Date("2020-12-01")
            }
            const expectedID = '000001';

            const expectedItem = {
                text: data.text,
                when: data.when,
                status: "",
                id: expectedID
            };

            const uuid = require('uuid');
            const fakeUUID = sandbox.fake.returns(expectedID);
            sandbox.replace(uuid, "v4", fakeUUID);

            const todo = new Todo(data);

            const result = todo.isValid();

            expect(result).to.be.ok;
            expect(uuid.v4.calledOnce).to.be.ok;
            expect(todo).to.be.deep.equal(expectedItem);

        });
    });
});
