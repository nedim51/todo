import { TodoStatusEnum } from "src/app/enums/todo-status.enum";

export interface ITodo {
    id: number;
    text: string;
    description: string;
    status: TodoStatusEnum;
};

export type ITodos = Array<ITodo>;