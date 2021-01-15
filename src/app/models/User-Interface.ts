export interface UserAccount{
    id:number;
    role:Role;
    courseName:Course;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phoneNumbe:string;
    dateOfBirth:Date;



}
export enum Role{
    ADMIN,GUIDE,STUDENT
}
export enum Course{
    DAC, DIOT, DBDA, DAI
}