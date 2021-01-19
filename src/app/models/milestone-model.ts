import { Task } from "./task-model";

export interface Milestone{
    id:number;
    startDate:number;
    endDate:number;
    milestoneCheckPoint:string;
    tasks:Task[];
}