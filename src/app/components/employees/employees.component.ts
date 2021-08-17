import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../models/Employee';
import { Component, OnInit,  AfterViewInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';


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

  //Set up mat table
  displayedColumns2: String[] = ['id', 'name', 'lastName1', 'lastName2', 'email', 'userType', 'wapps', 'id2', 'id3'];
  dataSource2: any;
  //Set up mat paginator and mat sort
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;

  employeeForm : FormGroup;
  startDate = new Date(1990, 0, 1);
  employee = new Employee();
  isLoading = false;

  idCompany = Number(localStorage.getItem("idCompany"));
  idAdmin = Number(localStorage.getItem("idAdmin"));


  constructor( private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.createForm();

  }

  ngAfterViewInit() {
    this.getEmployees();
  }


  getEmployees(){
    this.employeeService.getRecords(this.idCompany).subscribe(
      (success) =>{
        this.dataSource2 = new MatTableDataSource<Employee>(success);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
      },
      (err) =>{
        console.log(err);
      }
    )
  }


  saveData(){
    this.isLoading=true;
    this.employee.idCompany = this.idCompany;
    this.employee.name = this.employeeForm.value.name;
    this.employee.lastName1 = this.employeeForm.value.lastName1;
    this.employee.lastName2 = this.employeeForm.value.lastName2;
    this.employee.email = this.employeeForm.value.email;
    this.employee.password = this.employeeForm.value.password;
    this.employee.bornDate = this.generateBornDate();

    this.employeeService.postRecord(this.employee).subscribe(
      (success) =>{
        this.isLoading = false;
        console.log(success);
        this.openSnackBar("Registrado con éxito");
        this.cancel();
        this.getEmployees();
      },
      (err) =>{
        console.log(err);
        this.openSnackBar(err.error);
        console.log(err.error);
      }
    )


  }

  generateBornDate(){
    let date = '';
    let day='';
    let month = '';

    if(this.employeeForm.value.bornDate._i.date < 10){
      day = '0' + this.employeeForm.value.bornDate._i.date;
    }else{
      day = this.employeeForm.value.bornDate._i.date;
    }

    if( (this.employeeForm.value.bornDate._i.month + 1) < 10){
      month = '0' + (this.employeeForm.value.bornDate._i.month + 1);
    }else{
      month = (this.employeeForm.value.bornDate._i.month + 1);
    }

    return day + '-' + month + '-' +this.employeeForm.value.bornDate._i.year ;
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
      password2: new FormControl('', [
        Validators.required
      ])
    });
  }

  deleteRegister(id:number, name:string){
    if(confirm(`¿Realmente desea eliminar a ${name} de la lista de empleados?`)){
      this.employeeService.deleteRecord(id).subscribe(
        (success)=>{
          this.openSnackBar("Eliminado con éxito");
          this.getEmployees();
        },
        (err)=>{
          console.log(err);
        }
      )
    }else{
      this.openSnackBar("Cancelado");
    }
  }


  openSnackBar(message : string) {
    let matConfig = new MatSnackBarConfig();
    matConfig.duration = 5000;
    this.snackBar.open(message,"Cerrar", matConfig)
  }

}
