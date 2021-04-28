import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// model
import { User } from '../../../models/user';

// services
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {} as User;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    public authService: AuthService
    ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(){
    // this.formBuilder.group crea un grupo de formControls basados en json
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

  signUp(event: Event){
    event.preventDefault();
    if(this.form.valid){
      this.user = this.form.value;
      // servicio
      this.authService.userSignup(this.user).subscribe(
        res => {
          console.log(res);
        },
        err => console.error('Error al crear el usuario. ' + err)
      )
    }
  }


}
