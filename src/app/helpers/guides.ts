import { IGuidesSimple } from "../interfaces/guide.interface";

export const TODO_STATUS_NAMES: IGuidesSimple = [
    {
        code: 'InProgress',
        name: 'In progress...',
    },
    {
        code: 'Completed',
        name: 'Completed!',
    }
];

export const TODO_STATUS_FILTER_NAMES: IGuidesSimple = [
    {
        name: 'All',
        code: 'all',
    },
    {
        name: 'Completed!',
        code: 0,
    },
    {
        name: 'In progress...',
        code: 1,
    }
];

