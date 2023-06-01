import { AuthInterface } from "../authInterfaces/auth-interface";

export class UserDTO implements AuthInterface{
	id: number = 0;
	email: string = "";
	password: string = "";
}