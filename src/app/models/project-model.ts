import { StudentActivityComponent } from "../student/student-activity/student-activity.component";
import { Guide } from "./guide-model";
import { Student } from "./student-model";
import { Technology } from "./technology-model";

export interface Project{
    id:number;
    projectTitle:string;
    projectDescription:string;
    startDate:Date;
    endDate:Date;
    teamLead:Student;
    guide:Guide;
    technologies:Technology[];





}