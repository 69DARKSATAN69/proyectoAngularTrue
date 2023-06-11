import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterdictPrivateNavService implements HttpInterceptor{
token:string
  constructor(private router:Router) {
    this.token = '';
   }
//Esto es un interceptor cuyo cometido es interrumpir la navegación y redirigir a la página de auth si el usuario trata de hacer cosas en la
//zona privada sin disponer de un token. Puesto que nuestra zona privada es un sólo componente sin navegación extra, hubo que colocar este
//interceptor en su módulo padre para interrumpir la navegación hacia la misma.

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Primero asigna a la variable token el ya guardado o en su defecto un string vacío. Acto seguido, comprueba si la ruta interceptada
    //require de autorización para acceder a ella con la función checkRequiresAuth. Si no es así, prosigue la navegación.
    //Si es así, comprueba si el token no es falsy, en cuyo caso redirige a la página de auth y muestra un error. 
    //Si el token es truthy, añade el token como header a la request y prosigue la navegación.
    this.token = sessionStorage.getItem('token') || '';
    const requiresAuth = this.checkRequiresAuth();
    if(requiresAuth && !this.token){
      this.router.navigate(['/auth']);
      return throwError('token is empty or missing');
    }else if(requiresAuth && this.token){
//las req no se pueden modificar directamente, hay que clonarlas y sobre las clonadas añadir los campos pertinentes
    let authenticated_req = req.clone({headers: req.headers.set('Authorization', `Bearer ${this.token}`) });
    console.log(authenticated_req);
    return next.handle(authenticated_req).pipe(
      // En caso de error, llama a la función manejadorPeticionesError.
      catchError(this.manejadorPeticionesError.bind(this))); 
    }
    return next.handle(req);
  }
  
  
  private manejadorPeticionesError(err:any){
    //Esta función comprueba los posibles errores de navegación que hayan podido surgir. En función de cuál pudo acontecer
    //redirige al usuario a la página de login, al inicio o a la página de not found.
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

    private checkRequiresAuth():boolean{
      //Esta función es intermedia entre el interceptor propiamente dicho y la siguiente, que contiene la lógica.
      //toma la ruta de la request, la envía a la siguiente función y devuelve el resultado.
      let currentRoute = this.router.routerState.snapshot.root;
      let requiresAuth = this.getRouteRequireAuth(currentRoute);
      return requiresAuth;
    }

    private getRouteRequireAuth(route:ActivatedRouteSnapshot):boolean{
      //Esta función recibe la ruta de la request de la anterior función y comprueba si su metadata contiene 'requiresAuth' como true.
      //En caso de la ruta tener hijo/s, hace la misma comprobación al primero. Esto es relevante porque nuestra página privada es
      //un módulo con lazy loading, por lo que una comprobación sencilla fracasa.
      //En caso de no necesitar autorización, devuelve falso.
      if(route.data && route.data['requiresAuth']){
        return true;
      }
      if (route.firstChild) {
        return this.getRouteRequireAuth(route.firstChild);
      }
      return false;
    }


}
