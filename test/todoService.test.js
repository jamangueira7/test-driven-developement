const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');
const TodoService = require('../src/todoService');
const Todo = require('../src/todo');

describe('todoService', () => {

    let sandbox;
    before(() => {
        sandbox = createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('#list', () => {

        const mockDatabase = [
            {
                name: 'XuxaDaSilva',
                age: 90,
                meta: { revision: 0, created: 1615258012916, version: 0 },
                '$loki': 1
            }
        ];

        let todoService;

        beforeEach(() => {
            const dependecies = {
                todoRepository: {
                    list: sandbox.stub().returns(mockDatabase)
                }
            };

            todoService = new TodoService(dependecies);
        });

        it('should return data on a specific format', () => {
            const result = todoService.list();
            const [{ meta, $loki, ...expected }] = mockDatabase;

            expect(result).to.be.deep.equal([expected]);
        });
    });

    describe('#create', () => {

        let todoService;

        beforeEach(() => {
            const dependecies = {
                todoRepository: {
                    list: sandbox.stub().returns(true)
                }
            };

            todoService = new TodoService(dependecies);
        });

        it('shouldn\'t save todo item with invalid data', () => {
            const data = new Todo({
                text: '',
                when: '',
            });

            Reflect.deleteProperty(data, 'id');

            const expected = {
                error: {
                    message: 'invalid data',
                    data: data
                }
            };

            const result = todoService.create(data);

            expect(result).to.be.deep.equal(expected);
        });

        it('should save todo item with late status when the property is further than today', () => {
            const properties = {
                text: 'I must walk my dog',
                when: new Date("2020-12-01 12:00:00 GMT-0")
            };

            const data = new Todo(data);

            expect(result).to.be.deep.equal([expected]);
        });

        it('should save todo item with pending status', () => {
            const result = todoService.list();
            const [{ meta, $loki, ...expected }] = mockDatabase;

            expect(result).to.be.deep.equal([expected]);
        });
    });
});

