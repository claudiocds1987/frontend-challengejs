import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NavComponent } from './components/nav/nav.component';
// import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { OperationFormComponent } from './components/operation-form/operation-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { EditOperationComponent } from './components/edit-operation/edit-operation.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'addOperation',
        component: OperationFormComponent
      },
      {
        path: 'editOperation/:id_operation',
        component: EditOperationComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
