import { TodoStatusEnum } from "src/app/enums/todo-status.enum";
import { ITodo, ITodos } from "../../interfaces/todo/todo-item.interface";

export const TODOS: ITodos = [
    // {
    //     id: 1,
    //     text: 'Buy a new gaming laptop',
    //     description: 'Buy a new gaming laptop description',
    //     status: TodoStatusEnum.InProgress,
    // },
    // {
    //     id: 2,
    //     text: 'Complete previous task',
    //     description: 'Complete previous task description',
    //     status: TodoStatusEnum.InProgress,
    // },
    // {
    //     id: 3,
    //     text: 'Create some Angular app',
    //     description: 'Create some Angular app description',
    //     status: TodoStatusEnum.Completed,    
    // }
];

export const INITIAL_TODO: ITodo = {
    id: -1,
    text: '',
    description: '',
    status: TodoStatusEnum.InProgress,
}