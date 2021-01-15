
import { IUserAccount } from "./User-Interface";

export interface IStudent extends IUserAccount{
    prn:bigint;
    user:number;
    project:number;

}