import { UserAccount } from "./User-Interface";

export interface Admin extends UserAccount{
    id:number;
    projectMinSize:number;
    userAccount:UserAccount;



}