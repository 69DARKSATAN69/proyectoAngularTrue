import { AuthInterface } from "../authInterfaces/auth-interface";

export class UserDTO implements AuthInterface{
	public id: number = 0;
	public email: string = "";
	public password: string = "";
}

//esta clase existe para implementar la interfaz AuthInterface.
//vg. id: 1, email: 'aa@aa.com', password: 'aaaaa'