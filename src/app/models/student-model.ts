
import { UserAccount } from "./User-Interface";

export interface Student extends UserAccount{
    prn:bigint;
    user:number;
    project:number;

}