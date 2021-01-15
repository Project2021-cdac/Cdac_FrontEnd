export interface Activity{
    id:number;
    createdOn:Date;
    activityDesription:string;
    list:Array<string | string>;
    projectId: number;
}