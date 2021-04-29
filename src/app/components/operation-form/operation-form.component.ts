import { Component, OnInit } from '@angular/core';

// para forms reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

// model
import { Operation } from '../../models/operation';

// services
import { OperationService } from '../../services/operation.service';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss']
})
export class OperationFormComponent implements OnInit {

  /* IMPORTANTE: Para que funcionen los form reactivos importar en app.module.ts
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';*/

  operation = {} as Operation;
  // operationsList = {} as Operation;
  operationsList: Operation[] = [];
  
  types = [
    'ingreso',
    'egreso',
  ];

  categories = [
    'comida',
    'viaticos',
    'otros',
    'impuestos'
  ]

  currentDate = new Date();
  
  form: FormGroup;
  userEmail;

  constructor(
    private formBuilder: FormBuilder,
    public operationService: OperationService
    ) {
    if(localStorage.getItem('user') !== null){
      this.userEmail = localStorage.getItem('user');
    }
    this.buildForm();
  }

  ngOnInit(): void {
    // sadasdsad
  }

  getAllOperationsByUserAndType(operationType: string){
    this.operationService.getAllOperationsByUserAndType(this.userEmail, operationType).subscribe(
      res => {
        console.log(res);
        this.operationsList = res;
      },
      err => console.error('Error al obtener las operaciones. ' + err)
    );
  }

  private buildForm(){
    // this.formBuilder.group crea un grupo de formControls basados en json
    this.form = this.formBuilder.group({
      concept: ['', [Validators.required, Validators.maxLength(50)]],
      amount:  ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      date: [this.currentDate, [Validators.required]],  
    })
  }

  // para hacer referencia a los campos del formBuilder
  get conceptField(){
    return this.form.get('concept');
  }

  get amountField(){
    return this.form.get('amount');
  }
  
  get dateField(){
    return this.form.get('date');
  } 

  get typeField(){
    return this.form.get('type');
  } 

  get categoryField(){
    return this.form.get('category');
  } 

  // captura el value del <select> tipos
  captureType(event: MatSelectChange) {
    this.operation.type = event.value;
    // console.log('Objeto: '+ this.operation.tipo);
  }

  // captura el value del <select> categorias
  captureCategory(event: MatSelectChange) {
    this.operation.category = event.value;
  }

  addOperation(event: Event){
    event.preventDefault(); // para que no recargue/refresh la pagina al enviar la data
    if(this.form.valid){
      this.operation = this.form.value;
      this.operation.userEmail = this.userEmail;
      console.log('EMAIL: ' + this.operation.userEmail);
      console.log('CONCEPTO: ' + this.operation.concept);
      console.log('MONTO: ' + this.operation.amount);
      console.log('TIPO: ' + this.operation.type);
      console.log('CATEGORIA: ' + this.operation.category);
      console.log('FECHA: ' + this.operation.date);
      
      if(this.operation.date > this.currentDate){
        alert('La fecha de operación no puede ser mayor a la fecha actual.');
      }else{
        console.log('CACA');
        // aca service que haga el insert
        this.operationService.createOperation(this.operation).subscribe(
          res => {
            console.log(res);
            alert('La operación fue guardada!');
            this.form.reset();
          },
          err => alert('Error. No se pudo realizar la operación')
        );
        
      }

    }   
  }

  // captura el value del <select> tipos de la lista
  captureOperationType(event: MatSelectChange){
    let operationType = event.value;
    console.log('OP ELEGIDA: ' + operationType);
    this.getAllOperationsByUserAndType(operationType);
  }

}
