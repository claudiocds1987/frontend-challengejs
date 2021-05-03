import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// para forms reactivos
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

// model
import { Operation } from '../../models/operation';
import { Category } from '../../models/category';

// services
import { OperationService } from '../../services/operation.service';
import { CategoryService } from '../../services/category.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss'],
})
export class OperationFormComponent implements OnInit {
  
  operation = {} as Operation;
  operationsList: any[] = [];
  types = ['ingreso', 'egreso'];
  categories: Category[] = [];
  currentDate = new Date();
  form: FormGroup;
  userEmail;

  selectValue = '';
  // para habilitar o deshabilitar los select del filtrado
  checkbox1 = true;
  checkbox2 = false;
  
  constructor(
    private formBuilder: FormBuilder,
    public operationService: OperationService,
    public categoryService: CategoryService,
    private router: Router
  ) {
    if (localStorage.getItem('user') !== null) {
      this.userEmail = localStorage.getItem('user');
    }
    this.buildForm();
  }

  ngOnInit(): void {
    this.getCategories();
    this.filterOperationsByUser('ingreso');
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (err) => console.error('Error to get categories ' + err)
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      concept: ['', [Validators.required, Validators.maxLength(50)]],
      amount: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      date: [this.currentDate, [Validators.required]],
    });
  }

  // para hacer referencia a los campos del formBuilder
  get conceptField() {
    return this.form.get('concept');
  }

  get amountField() {
    return this.form.get('amount');
  }

  get dateField() {
    return this.form.get('date');
  }

  get typeField() {
    return this.form.get('type');
  }

  get categoryField() {
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

  addOperation(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.operation = this.form.value;
      this.operation.userEmail = this.userEmail;
      this.operation.state = true;
      if (this.operation.date > this.currentDate) {
        alert('La fecha de operación no puede ser mayor a la fecha actual.');
      } else {
        this.operationService.createOperation(this.operation).subscribe(
          (res) => {
            alert('La operación fue guardada!');
            this.form.reset();
            this.router.navigate(['addOperation']).then(() => {
              window.location.reload();
            });
          },
          (err) => alert('Error. No se pudo realizar la operación. ' + err)
        );
      }
    }
  }

  filterOperationsByUser(search: string) {
    this.operationService
      .filterOperationsByUser(this.userEmail, search)
      .subscribe(
        (res) => {
          this.operationsList = res;
        },
        (err) => console.error('Error al obtener las operaciones. ' + err)
      );
  }

  // captura el value del <select> operacion del filtrado
  captureOperation2(event: MatSelectChange) {
    this.selectValue = event.value;
    this.filterOperationsByUser(this.selectValue);   
  }

  // captura el value del <select> categorias del filtrado
  captureCategory2(event: MatSelectChange) {
    this.selectValue = event.value;
    this.filterOperationsByUser(this.selectValue);
  }

  setStateSelectOp2(event: MatCheckboxChange, value: string) {
    const activated = event.checked;
   
    switch (value) {
      case 'type':
        if (activated) {
          this.filterOperationsByUser('ingreso');
          this.checkbox2 = !this.checkbox2;
          this.checkbox1 = !this.checkbox1;
        } else {
          this.checkbox1 = !this.checkbox1;
          this.checkbox2 = !this.checkbox2;
        }
        break;
      case 'category':
        if (activated) {
          this.checkbox2 = !this.checkbox2;
          this.checkbox1 = !this.checkbox1;     
        } else {
          this.checkbox2 = !this.checkbox2;
          this.checkbox1 = !this.checkbox1;
          this.filterOperationsByUser('ingreso');
        }
        break;
      default:
    }
  }

  deleteOperation(id_operation: number) {
    const deleteOperation: Partial<Operation> = {
      state: false,
    };
    
    const confirm = window.confirm('¿Realmente quiere eliminar la operación?');

    if(confirm){
      this.operationService.deleteOperation(id_operation, deleteOperation).subscribe(
        (res) => {
          if (res) {
            alert('La operación fue eliminada');
            this.filterOperationsByUser(this.selectValue);
          }
        },
        (err) => alert('Error al intentar eliminar la operación')
      );
    }
  }

}
