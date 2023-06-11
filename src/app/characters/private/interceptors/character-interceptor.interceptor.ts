import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CharacterInterceptorInterceptor implements HttpInterceptor {

  constructor(private rutas:Router) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		let token = sessionStorage.getItem('token');

		if(token){
			const authRequest:HttpRequest<unknown> = request.clone({
				setHeaders: {
					Authorization: "Bearer "+ token
				}
			});
			
			return next.handle(request);
		}else{
			this.rutas.navigate(["auth"]);
		}
			
		return next.handle(request);
	}
}
