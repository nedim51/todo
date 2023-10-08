import { ITodo, ITodos } from "../../interface/todo/todo-item.interface";

export const TODOS: ITodos = [
    {
        id: 1,
        text: 'Buy a new gaming laptop',
        description: 'Buy a new gaming laptop description'
    },
    {
        id: 2,
        text: 'Complete previous task',
        description: 'Complete previous task description'
    },
    {
        id: 3,
        text: 'Create some Angular app',
        description: 'Create some Angular app description'    
    }
];

export const INITIAL_TODO: ITodo = {
    id: -1,
    text: '',
    description: ''
}