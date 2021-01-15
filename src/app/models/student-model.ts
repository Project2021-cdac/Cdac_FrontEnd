import { Project } from "./project-model";
import { UserAccount } from "./User-Interface";

export interface Student extends UserAccount{
    prn:bigint;
    user:UserAccount;
    project:Project;

}