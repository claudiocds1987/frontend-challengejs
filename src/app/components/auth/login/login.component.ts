import { Component, OnInit } from '@angular/core';
// para forms reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// model
import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {} as User;
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
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

  login(event: Event){
    event.preventDefault();
    if(this.form.valid){
      console.log(this.form.value);
    }
  }

}
