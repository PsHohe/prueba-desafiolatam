import { Task } from './Task';

export interface Project {
    id: string;
    name: string;
    startDate: Date;
    tasks: Task[];
}