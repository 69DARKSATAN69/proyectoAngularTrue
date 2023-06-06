import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../DTOclasses/userDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

url:string;

constructor(private http:HttpClient) {this.url = 'http://localhost:3000'; }



getUserList():Observable<UserDTO[]>{
 return this.http.get<UserDTO[]>(this.url + '/users');
}

getOneUser(id:number):Observable<UserDTO>{
  return this.http.get<UserDTO>(this.url + `/users/${id}`);
}

registerUser(body:UserDTO):Observable<UserDTO>{
  return this.http.post<UserDTO>(this.url + '/register', body);
}

logUser(body:UserDTO):Observable<UserDTO>{
  return this.http.post<UserDTO>(this.url + '/login', body);
}

// deleteUser(id:number):Observable<any>{
//   return this.http.delete(this.url + `/users/${id}`);
// }

// editUser(id:number, body:UserDTO):Observable<any>{
//   return this.http.put(this.url + `/users/${id}`, body);
// }


}
