
import { UserAccount } from "./User-Interface";

export interface IStudent extends UserAccount{
    prn:bigint;
    user:number;
    project:number;

}