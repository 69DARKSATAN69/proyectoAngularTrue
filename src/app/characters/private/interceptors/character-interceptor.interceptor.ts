/* 
  **************************************************************
	Character Interceptor.
	Interceptor que se ocupa de, si se ha hecho login, meter el token de autenticación en los headers de las peticiones
	de la sección privada.
	Si no se está logeado entonces no permite acceder a la sección privada y redirige al login.

	Fecha de entrega: 13/06/2023
	Dev: Andrea
  **************************************************************
*/

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CharacterInterceptorInterceptor implements HttpInterceptor {

	//Inyecto el router para poder hacer las redirecciones.
  constructor(private route:Router) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		//Recoge el token del sessionStorage
		let token = sessionStorage.getItem('token');

		//Si existe el token entonces lo incluye en los headers de las peticiones.
		if(token){
			const authRequest:HttpRequest<unknown> = request.clone({
				setHeaders: {
					Authorization: "Bearer "+ token
				}
			});
			
			return next.handle(authRequest).pipe(
				catchError(this.errorHandler.bind(this))
			);
		//Si no existe el token entonces redirecciona a la página de login.	
		}else{
			this.route.navigate(["auth"]);
		}
			
		return next.handle(request);
	}

	//Gestión de errores.
	errorHandler(error:any){
		const unauthorized = 401;

		//Si da error de no autorizado entonces envía de vuelta al login.
		if(error instanceof HttpErrorResponse){
			if(error.status === unauthorized){
				this.route.navigate(["auth"]);
			}
		}

		return throwError(() => new Error(error));
	}
}
