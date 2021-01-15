export interface IActivity{
    id:number;
    createdOn:Date;
    activityDesription:string;
    list:Array<string | string>;
    projectId: number;
}