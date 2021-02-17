import { Student } from "./student-model";
import { Technology } from "./technology-model";



export interface Project{
    id:number;
    title:string;
    description:string;
    startDate:string;
    endDate:string;
    teamLead:Student;
    guide:number;
    technologies:Technology[];





}