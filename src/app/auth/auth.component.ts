import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-services/auth-service.service';
import { TokenDTO } from './DTOclasses/tokenDTO';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  public formGroup:FormGroup;
  private id:number;
  public register:boolean;
  public switchText:string;
  public logText:string;


  constructor(private formbuilder:FormBuilder, private fetcher:AuthServiceService, private router:ActivatedRoute){
  this.formGroup = this.formbuilder.group({});
  this.id = 0;
  this.register = true;
  this.logText = this.register ? 'Register' : 'Login';
  this.switchText = this.register ? 'Would you rather register instead?' : 'You might want to log in instead';
  
  this.router.params.subscribe(params => {
    this.id = params['id'] || 0;
    console.log(this.id);
  });
  }
  ngOnInit(){
    this.empezarFormulario();
  }
  
  empezarFormulario():void{
    this.crearFormulario();

  }
  
  
  private crearFormulario():void{
 

    this.formGroup = this.formbuilder.group({
      email: ['' , [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]]
      
    });
  }
  public testFormulario(){
    console.log(this.formGroup.value);
  }

public handleAuth(){
  this.register ? this.registerUsuario() : this.logUsuario();
}

  public registerUsuario():void{
    
  this.fetcher.registerUser(this.formGroup.value).subscribe((data:any) => {sessionStorage.setItem('token', data.accessToken); console.log(data)});
  
  }
  
  public logUsuario():void{
    this.fetcher.logUser(this.formGroup.value).subscribe((data:any)=>{sessionStorage.setItem('token', data.accessToken); console.log(data)});
  }

  public switchMode(){
    this.register = !this.register;
    this.logText = this.register ? 'Register' : 'Login';
    this.switchText = this.register ? 'Would you rather register instead?' : 'You might want to log in instead'
    console.log('register is', this.register);

  }

  
}