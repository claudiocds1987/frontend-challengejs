import { Component, OnInit } from '@angular/core';

// para forms reactivos
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

// model
import { Operation } from '../../models/operation';
import { Category } from '../../models/category';

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
  operationsList: any[] = [];
  
  types = [
    'ingreso',
    'egreso',
  ];

  categories: Category[] = [];
  currentDate = new Date();
  form: FormGroup;
  userEmail;

  // disableSelect = new FormControl(false);

  constructor(
    private formBuilder: FormBuilder,
    public operationService: OperationService,
    public categoryService: CategoryService
    ) {
    if(localStorage.getItem('user') !== null){
      this.userEmail = localStorage.getItem('user');
    }
    this.buildForm();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => console.error('Error to get categories ' + err)
    );
  }

  private buildForm(){
    // this.formBuilder.group crea un grupo de formControls basados en json
    this.form = this.formBuilder.group({
      concept: ['', [Validators.required, Validators.maxLength(50)]],
      amount:  ['', [Validators.required, Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
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
    
      if(this.operation.date > this.currentDate){
        alert('La fecha de operación no puede ser mayor a la fecha actual.');
      }else{
        this.operationService.createOperation(this.operation).subscribe(
          res => {
            alert('La operación fue guardada!');
            this.form.reset();
          },
          err => alert('Error. No se pudo realizar la operación. ' + err)
        );
        
      }

    }   
  }


  filterOperationsByUser(search: string){
    this.operationService.filterOperationsByUser(this.userEmail, search).subscribe(
      res => {
        this.operationsList = res;
      },
      err => console.error('Error al obtener las operaciones. ' + err)
    );
  }

  // captura el value del <select> del filtrado
  captureOperationType(event: MatSelectChange){
    const operationType = event.value;
    this.filterOperationsByUser(operationType);
  }

   // captura el value del <select> categorias del filtrado
   captureCategory2(event: MatSelectChange) {
    const category_id = event.value;
    this.filterOperationsByUser(category_id);
  }

   // getAllOperationsByUserAndType(operationType: string){
  //   this.operationService.getAllOperationsByUserAndType(this.userEmail, operationType).subscribe(
  //     res => {
  //       this.operationsList = res;
  //     },
  //     err => console.error('Error al obtener las operaciones. ' + err)
  //   );
  // }

}
