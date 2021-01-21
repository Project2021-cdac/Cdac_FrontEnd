import { Technology } from "./technology-model";



export interface Project{
    id:number;
    title:string;
    description:string;
    startDate:string;
    endDate:string;
    teamLead:number;
    guide:number;
    technologies:Technology[];





}