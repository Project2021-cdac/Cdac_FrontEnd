import { Technology } from "./technology-model";
import { UserAccount } from "./User-Interface";

export interface Guide extends UserAccount{
    id:number;
    inSession:boolean;
    user:UserAccount;
    technologies:Set<Technology>;

}