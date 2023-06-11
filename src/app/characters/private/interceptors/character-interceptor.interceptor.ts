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

  constructor(private route:Router) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		let token = sessionStorage.getItem('token');

		if(token){
			const authRequest:HttpRequest<unknown> = request.clone({
				setHeaders: {
					Authorization: "Bearer "+ token
				}
			});
			
			return next.handle(authRequest).pipe(
				catchError(this.errorHandler.bind(this))
			);
			
		}else{
			this.route.navigate(["auth"]);
		}
			
		return next.handle(request);
	}

	errorHandler(error:any){
		const unauthorized = 401;

		if(error instanceof HttpErrorResponse){
			if(error.status === unauthorized){
				this.route.navigate(["auth"]);
			}
		}

		return throwError(() => new Error(error));
	}
}
