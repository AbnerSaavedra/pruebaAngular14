import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public sending = false

  public loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) { 
    this.loginForm = this.fb.group({
      email: ['',  [ Validators.required,  Validators.email, Validators.pattern(/^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],
      password: ['', [Validators.required]]
  })
  }

  ngOnInit(): void {
  }

  signIn(){

    this.sending = true
    if(this.loginForm.valid){
      var email = this.loginForm.value.email

      this.userService.login(this.loginForm.value).subscribe((resp: any) =>{
        this.sending = false
        
        if(resp.token){
      
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inicio de sesión exitoso: '+ email,
            timer: 5000
          })
        }
      }, error =>{
        this.sending = false
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ha ocurrido un error: '+ JSON.stringify(error.error.error)
        })
      })
    }else{
      this.sending = false
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Formulario no válido'
      })
    }

    this.loginForm.reset()
  }

  get f(){
    return this.loginForm.controls;
  }

}
