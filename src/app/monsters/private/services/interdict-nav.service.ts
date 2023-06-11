import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Esta es una versión más genérica del interceptor situado en el módulo monstruos. Comprueba la existencia del token cuando se trata
//de navegar a cualquier parte en este módulo y de ser falsy redirige a la página de auth.
//en caso de existir, lo añade a la request como header.
//Puesto que esta zona privada es un sólo componente cuyo acceso ya está regido por otro interceptor, este sólo entra en juego
//cuando una vez dentro de la zona privada el usuario trata de borrar, editar o postear monstruos sin token.
export class InterdictNavService implements HttpInterceptor{
token:string
  constructor(private router:Router) {
    this.token = '';
   }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //funciona de manera similar al del módulo padre, aunque las comprobaciones son sólamente sobre la existencia del token.
    //puesto que esta zona es privada, cualquier navegación dentro de ella debe restringirse.
    this.token = sessionStorage.getItem('token') || '';
    if(!this.token){
      this.router.navigate(['/auth']);
      return throwError('token is empty or missing');
    }
    let authenticated_req = req.clone({headers: req.headers.set('Authorization', `Bearer ${this.token}`) });
    console.log(authenticated_req);
    return next.handle(authenticated_req).pipe(
      catchError(this.manejadorPeticionesError.bind(this))); 
  }

  private manejadorPeticionesError(err:any){
    //Es el mismo manejador de errores que el módulo padre, con las mismas redirecciones.
    const unauthorized = 401;
    const server_error = 500;
    const not_found = 404;
    
    if(err instanceof HttpErrorResponse){
    if(err.status === unauthorized ){
      this.router.navigate(['/auth']);
    }
    if(err.status === server_error){
      this.router.navigate(['']);
    }
    if(err.status === not_found){
      this.router.navigate(['notFound']);
    }

    }
    return throwError(err);
    }

}
