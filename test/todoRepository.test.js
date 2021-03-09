const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');
const TodoRepository = require('../src/todoRepositoriy');

describe('todoRepositoriy', () => {
    let todoRepositoriy;
    let sandbox;
    before(() => {
        todoRepositoriy = new TodoRepository();
        sandbox = createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('methods signature', () => {
        it('should call insertOne from lokijs', () => {

        });
        it('should call find from lokijs', () => {
            const mockDatabase = [
                {
                    name: 'XuxaDaSilva',
                    age: 90,
                    meta: { revision: 0, created: 1615258012916, version: 0 },
                    '$loki': 1
                }
            ];

            const functioName = "find";
            const expectedReturn = mockDatabase;

            sandbox.stub(
                todoRepositoriy.schedule,
                functioName
            ).returns(expectedReturn);

            const result = todoRepositoriy.list();

            expect(result).to.be.deep.equal(expectedReturn);
            expect(todoRepositoriy.schedule[functioName].calledOnce).to.be.ok;

        });
    });
});

