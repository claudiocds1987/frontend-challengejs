import { Component, OnInit } from '@angular/core';

// para forms reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

// model
import { Operation } from '../../models/operation';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss']
})
export class OperationFormComponent implements OnInit {

  /* IMPORTANTE: Para que funcionen los form reactivos importar en app.module.ts
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';*/

  operation = {} as Operation;
  
  tipos = [
    'ingreso',
    'egreso',
  ];

  currentDate = new Date();
  
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder) 
    {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(){
    // this.formBuilder.group crea un grupo de formControls basados en json
    this.form = this.formBuilder.group({
      concepto: ['', [Validators.required, Validators.maxLength(25)]],
      monto:  ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      tipo: ['', [Validators.required]],
      fecha: [this.currentDate, [Validators.required]],  
    })
  }

  // para hacer referencia a los campos del formBuilder
  get conceptoField(){
    return this.form.get('concepto');
  }

  get montoField(){
    return this.form.get('monto');
  }
  
  get fechaField(){
    return this.form.get('fecha');
  } 

  get tipoField(){
    return this.form.get('tipo');
  } 

  // captura el value del <select> tipos
  captureValue(event: MatSelectChange) {
    this.operation.tipo = event.value;
    // console.log('Objeto: '+ this.operation.tipo);
  }

  addOperation(event: Event){
    event.preventDefault(); // para que no recargue/refresh la pagina al enviar la data
    if(this.form.valid){
      this.operation = this.form.value;
      this.operation.userEmail = 'clau@gmail.com'
      //this.operation.fecha = this.currentDate;
      console.log('CONCEPTO: ' + this.operation.concepto);
      console.log('MONTO: ' + this.operation.monto);
      console.log('TIPO: ' + this.operation.tipo);
      console.log('FECHA: ' + this.operation.fecha);
      // aca service que haga el insert

    }   
  }

}
