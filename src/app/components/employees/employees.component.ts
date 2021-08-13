import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../models/Employee';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [
    {  provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class EmployeesComponent implements OnInit {

  employeeForm : FormGroup;
  startDate = new Date(1990, 0, 1);
  employee = new Employee;
  isLoading = false;
  date = '';
  day='';
  month = '';

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.createForm();

  }



  saveData(){
    this.isLoading=true;
    this.employee.idCompany = 2;
    this.employee.name = this.employeeForm.value.name;
    this.employee.lastName1 = this.employeeForm.value.lastName1;
    this.employee.lastName2 = this.employeeForm.value.lastName2;
    this.employee.email = this.employeeForm.value.email;
    this.employee.password = this.employeeForm.value.password;


    if(this.employeeForm.value.bornDate._i.date < 10){
      this.day = '0' + this.employeeForm.value.bornDate._i.date;
    }else{
      this.day = this.employeeForm.value.bornDate._i.date;
    }

    if( (this.employeeForm.value.bornDate._i.month + 1) < 10){
      this.month = '0' + (this.employeeForm.value.bornDate._i.month + 1);
    }else{
      this.month = (this.employeeForm.value.bornDate._i.month + 1);
    }

    this.employee.bornDate = this.day + '-' + this.month + '-' +this.employeeForm.value.bornDate._i.year ;

    //console.log(this.employee.bornDate);

    this.employeeService.postRecord(this.employee).subscribe(
      (success) =>{
        this.isLoading = false;
        console.log(success);
        this.cancel();
      },
      (err) =>{
        console.log(err);
      }
    )


  }

  cancel(){
    this.employeeForm.reset();
  }

  createForm(){
    this.employeeForm = new FormGroup({
      name: new FormControl('',[
        Validators.required
      ]),
      lastName1: new FormControl('',[
        Validators.required
      ]),
      lastName2: new FormControl('', [
        Validators.required
      ]),
      bornDate: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });
  }


}
