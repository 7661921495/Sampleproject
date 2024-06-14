import { UserRoles } from "./user-roles";

export interface User {
    id: string,
    platformUserId: string,
    userName: string,
    plantName: string,
    plantLogo: string,
    email: string,
    role: UserRoles;
    roles: [{}]

}