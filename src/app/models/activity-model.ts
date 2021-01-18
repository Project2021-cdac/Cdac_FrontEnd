export interface Activity{
    id:number;
    createdOn:string;
    description:string;
    list:Array<string | string>;
    projectId: number;
}