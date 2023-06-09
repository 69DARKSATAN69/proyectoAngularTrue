import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import {  catchError } from 'rxjs';
import { AuthServiceService } from './auth-services/auth-service.service';

//Este componente utiliza el servicio creado para manejar el servidor de auth. Utiliza un formulario reactivo para hacer tanto el login como el register
//de usuarios, cambiando el 'modo' con un botón.


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {


  //las variables llevan el contenido del formulario, si se esta en modo registro o login y el texto de los botones.
  //la variable de errores es null por defecto para esconder el div de errores y toma el valor de los mensajes de error que haya.
  public formGroup:FormGroup;
  public register:boolean;
  public switchText:string;
  public logText:string;
  public error:string | null;

//el constructor utiliza los modulos para crear formularios reactivos, el router para redirigir y el servicio de auth.
  constructor(private formbuilder:FormBuilder, private fetcher:AuthServiceService, private router:Router){
  this.formGroup = this.formbuilder.group({});
  this.register = true;
  this.logText = this.register ? 'Register' : 'Login';
  this.switchText = this.register ? 'You might want to log in instead' : 'Would you rather register instead?';
  this.error = null;

  }
  //al montarse el componente se crea el formulario reactivo
  ngOnInit(){
    this.startForm();
  }
  //esto es una función intermedia para evitar posibles problemas asíncronos en caso de que queramos crear un crud de usuarios.
  startForm():void{
    this.createForm();

  }
  
  //esta es la propia función de crear el formulario reactivo. Aplica validaciones elementales.
  private createForm():void{
 

    this.formGroup = this.formbuilder.group({
      email: ['' , [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]]
      
    });
  }

//esta es la función a la que llama el botón de submit, dependiendo del modo register/login se usa una u otra de las funciones siguientes.
public handleAuth(){
  this.register ? this.registerUser() : this.logUser();
}
//esta función recibe el observable del servicio de la función register, realiza la subscripción y guarda el token resultante y el email del usuario.
//en caso de errores, los pasa a la variable error para que se muestre en el html.
//si todo sale bien, redirije al usuario a la página root.
  public registerUser():void{
    this.error = null;

  this.fetcher.registerUser(this.formGroup.value)
  .pipe(catchError((err:any)=>{this.error = err.error; return []}))
  .subscribe((data:any) => {sessionStorage.setItem('token', data.accessToken); sessionStorage.setItem('userEmail', data.user.email);  this.router.navigate([''])});
 

  }
  //esta función es similar a la anterior, pero con el método login del servicio. Por el funcionamiento del servidor son prácticamente idénticos.
  //el manejo de errores es como la función anterior.
  //si todo sale bien, redirije al usuario a la página root.

  public logUser():void{
    this.error = null;

   
    this.fetcher.logUser(this.formGroup.value)
    .pipe(catchError((err:any)=>{this.error = err.error; return []}))
    .subscribe((data:any)=>{sessionStorage.setItem('token', data.accessToken); sessionStorage.setItem('userEmail', data.user.email); this.router.navigate(['']);});
  
  }
//el botón de cambio de modo llama a esta función. Cambia el boolean de register a su contrario y cambia el texto de botones según el valor de dicho boolean.
  public switchMode(){
    this.register = !this.register;
    this.logText = this.register ? 'Register' : 'Login';
    this.switchText = this.register ? 'You might want to log in instead' : 'Would you rather register instead?';

  }

  
}