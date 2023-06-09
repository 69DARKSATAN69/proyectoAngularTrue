import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

//Es relevante el cambio de estado de estar o no logeado en este componente

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  public isLoggedIn:boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public userEmail:string;
    constructor(private router:Router){
    //El valor inicial es la existencia de un token en sessionStorage transformado en boolean.
    //Si se llega aqui desde otro lado de la pagina, se vuelve a evaluar y comprobar los cambios. Esto se hace así porque en el módulo de auth,
    //al hacer login se redirige a este componente, y por tanto es cuando nos interesa ver si sigue existiendo o no el token.
      this.isLoggedIn = !!sessionStorage.getItem('token');
      this.router.events.subscribe((ev)=>{
        if(ev instanceof NavigationEnd){
          this.isLoggedIn = !!sessionStorage.getItem('token');
          this.userEmail = sessionStorage.getItem('userEmail') || '';
        }
      })
      this.userEmail = sessionStorage.getItem('userEmail') || '';
    }


    public logout():void{
      //Este metodo borra el token y hace update del boolean de estar logeado, para cambiar en el template de html entre los dos ngIf posibles
      //de mostrar el link a login o el boton de logout. También borra el email de usuario guardado y devuelve al usuario a la página de inicio
      
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userEmail');
      this.isLoggedIn = !!sessionStorage.getItem('token');
      this.router.navigate(['']);
    }



  }
