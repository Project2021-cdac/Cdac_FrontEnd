import { Guide } from "./guide-model";
import { Project } from "./project-model";

export interface Technology{
    id:number;
    technologyName:TechnologyName;
    guides:Set<Guide>;
    projects:Set<Project>;


}
export enum TechnologyName{
    CPP, SPRING_MVC, SPRING_BOOT, MICROSERVICE,  ANGULAR, REACT, NODE, JAVASCRIPT, 
	TYPESCRIPT, PHP, ASP_DOTNET, MYSQL, SQL_SERVER, ORACLE, MONGODB, CASSANDRA, REDIS, MEMCACHED, 
	AWS, AZURE, OPENSHIFT, DOCKER, KUBERNETES, SELENIUM, JUNIT
}