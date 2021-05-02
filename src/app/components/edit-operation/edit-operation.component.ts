import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// para forms reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

// model
import { Operation } from '../../models/operation';
import { Category } from '../../models/category';

// services
import { OperationService } from '../../services/operation.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-operation',
  templateUrl: './edit-operation.component.html',
  styleUrls: ['./edit-operation.component.scss'],
})
export class EditOperationComponent implements OnInit {
  operation = {} as Operation;
  operationArray: Operation[] = [];
  categories: Category[] = [];
  currentDate = new Date();
  form: FormGroup;
  userEmail;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public operationService: OperationService,
    public categoryService: CategoryService
  ) {
    if (localStorage.getItem('user') !== null) {
      this.userEmail = localStorage.getItem('user');
    }
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params.id_operation;
      this.operationService.getOperationById(id).subscribe(
        (res) => {
          this.operationArray = res;
          // rellenando los campos del form
          this.form.patchValue({
            concept: this.operationArray[0].concept,
            amount: this.operationArray[0].amount,
            category: this.operationArray[0].category,
            date: this.operationArray[0].date,
          });
        },
        (err) => console.error('error trying to get the operation')
      );
    });

    this.getCategories();
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
    // this.formBuilder.group crea un grupo de formControls basados en json
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
      category: ['', [Validators.required]],
      date: [this.currentDate, [Validators.required]],
    });
  }

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

  // captura el value del <select> categorias
  captureCategory(event: MatSelectChange) {
    this.operation.category = event.value;
  }

  updateOperation(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.operation = this.form.value;

      if (this.operation.date > this.currentDate) {
        alert('La fecha de operación no puede ser mayor a la fecha actual.');
      } else {
        this.operation.id_operation = this.operationArray[0].id_operation;
        this.operation.userEmail = this.userEmail;
        this.operation.type = this.operationArray[0].type;
        this.operation.state = this.operationArray[0].state;

        this.operationService.updateOperation(this.operation).subscribe(
          (res) => {
            alert('La operacion fue editada');
            this.form.reset();
            this.router.navigate(['addOperation']).then(() => {
              window.location.reload();
            });
          },
          (err) => alert('No se pudo editar la operación')
        );
      }
    }
  }
}
