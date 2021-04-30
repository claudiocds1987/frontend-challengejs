import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
// model
import { User } from '../../../models/user';

// services
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {} as User;
  form: FormGroup;
  currentDate = new Date();
  emailExist: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    public authService: AuthService,
    public userService: UserService,
    public router: Router
    ) {
    this.buildForm();
    this.checkEmail();
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
      this.user.registration_date = this.currentDate;
      // servicio
      this.authService.userSignup(this.user).subscribe(
        res => {
          console.log(res);
          alert('Usuario registrado exitosamente!')
          this.router.navigate(['login']).then(() => {
            // para hacer refresh
            window.location.reload();
          });
        },
        err => alert('Error, no se pudo hacer el registro de usuario')
      )
    }
  }

  checkEmail() {
    this.form
      .get('email')
      .valueChanges.pipe(
        debounceTime(450) // pasado este tiempo realiza la búsqueda en la db
      )
      .subscribe((value) => {
        this.userService.checkUserEmail(value).subscribe((res) => {
          if (res) {
            this.emailExist = true; 
          } else {
            this.emailExist = false;
          }
        }),
          (err) => console.error('Error en la db al verificar el email ' + err);
      });
  }

}
