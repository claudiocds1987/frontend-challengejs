import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// para forms reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// model
import { User } from '../../../models/user';

// services
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {} as User;
  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
    ) {
    this.buildForm();
   }

  ngOnInit(): void {
  
    if(localStorage.getItem('user') !== null){
      localStorage.removeItem('user');
      console.log('localStorage de user eliminada');
    }
  
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(6)]],  
    })
  }

  // para hacer referencia a los campos del formBuilder
  get emailField(){
    return this.form.get('email');
  }

  get passwordField(){
    return this.form.get('password');
  }

  login(event: Event){
    event.preventDefault();
    if(this.form.valid){
      this.user = this.form.value;
      this.authService.userLogin(this.user.email,this.user.password).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('user', this.user.email);
          this.router.navigate(['home']).then(() => {
            // hace refresh
            window.location.reload();
          });
        },
        err => alert('El usuario no existe')
      )

    }
  }

}
