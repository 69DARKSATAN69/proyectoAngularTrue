import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private urlAPI: string = 'http://localhost:3000/contact';

  constructor(private http: HttpClient) {}

  public getContact() {
    return this.http.get<any>(this.urlAPI);
  }

  public createComment(body: any) {
    return this.http.post<any>(this.urlAPI, body);
  }
}
