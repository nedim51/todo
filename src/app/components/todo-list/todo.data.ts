import { ITodo, ITodos } from "../../interface/todo/todo-item.interface";

export const TODOS: ITodos = [
    {
        id: 1,
        text: 'Buy a new gaming laptop'
    },
    {
        id: 2,
        text: 'Complete previous task'
    },
    {
        id: 3,
        text: 'Create some Angular app'
    }
];

export const INITIAL_TODO: ITodo = {
    id: -1,
    text: ''
}