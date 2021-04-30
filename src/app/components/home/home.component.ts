import { Component, OnInit } from '@angular/core';

// models
import { Operation } from '../../models/operation';

// services
import {OperationService } from '../../services/operation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  operations: Operation[] = [];
  incomeAmount:number = 0;
  expensesAmount:number = 0;
  constructor(public operationService: OperationService) {}

  ngOnInit(): void {
    this.calculateAmounts();
  }

  calculateAmounts(){
    this.operationService.getOperations().subscribe(
      res => {
        this.operations = res;
        this.operations.forEach(op => {
          const num = parseInt(op.amount.toString());  
          if(op.type === 'ingreso'){   
            this.incomeAmount += num;
          }else{
            // total amount type egreso
            this.expensesAmount += num;
          }
        })
      },
      err => console.error('Error al obtener operaciones de tipo ingreso')
    )
  }


}
