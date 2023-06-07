import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../DTOclasses/userDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

url:string;

//servicio sencillo de utilización del httpClient para realizar requests al servidor que utilizamos en materia de auth.

constructor(private http:HttpClient) {this.url = 'http://localhost:3000'; }


//recibe la lista de usuarios, útil si más adelante queremos hacer un crud de usuarios.
getUserList():Observable<UserDTO[]>{
 return this.http.get<UserDTO[]>(this.url + '/users');
}
//recibe una id y devuelve un usuario en concreto, útil si más adelante etc.
getOneUser(id:number):Observable<UserDTO>{
  return this.http.get<UserDTO>(this.url + `/users/${id}`);
}
//recibe un cuerpo de email y password para realizar un registro y devolver un token
registerUser(body:UserDTO):Observable<UserDTO>{
  return this.http.post<UserDTO>(this.url + '/register', body);
}
//igual que el anterior, pero en vez de crear un usuario nuevo sencillamente comprueba si existe.
logUser(body:UserDTO):Observable<UserDTO>{
  return this.http.post<UserDTO>(this.url + '/login', body);
}
//función que recibe un id y borra el usuario con esa id, útil en caso de querer extender esto.
deleteUser(id:number):Observable<any>{
  return this.http.delete(this.url + `/users/${id}`);
}
//función para editar usuarios, recibiendo id de identificación y body de email/password para modificarlo. útil en caso de extensión.
editUser(id:number, body:UserDTO):Observable<any>{
  return this.http.put(this.url + `/users/${id}`, body);
}


}
