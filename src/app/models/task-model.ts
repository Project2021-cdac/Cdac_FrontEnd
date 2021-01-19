import { Student } from "./student-model";

export interface Task{
    id:number;
    status:string;
    createdOn:string;
    createdBy:Student;
    description:string;
}