import { EmployeeService } from './../../services/employee.service';
import { CompanyService } from './../../services/company.service';
import { Employee } from './../../models/Employee';
import { Company } from './../../models/Company';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    {provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true} },
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  companyForm: FormGroup;
  userForm: FormGroup;
  startDate = new Date(1979, 0, 1);

  date = '';
  day='';
  month = '';


  company = new Company();
  admin = new Employee();

  constructor(private companyService: CompanyService, private adminService: EmployeeService) { }

  ngOnInit() {
    this.createLoginForm();
    this.createCompanyForm();
    this.createUserForm();

  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email : new FormControl('',[
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  createCompanyForm(){
    this.companyForm = new FormGroup({
      companyName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      description: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  createUserForm(){
    this.userForm = new FormGroup({
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
      adminEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      adminPassword: new FormControl('', [
        Validators.required
      ]),
    });
  }



  cancel(){
    this.loginForm.reset();
  }


  registerCompany(){
    this.company.name = this.companyForm.value.companyName;
    this.company.description = this.companyForm.value.description;
    console.log(this.company);
  }

  registerAdmin(){
    this.admin.userType = 1;
    this.admin.name = this.userForm.value.name;
    this.admin.lastName1 = this.userForm.value.lastName1;
    this.admin.lastName2 = this.userForm.value.lastName2;
    this.admin.bornDate = this.generateBornDate();
    this.admin.email = this.userForm.value.adminEmail;
    this.admin.password = this.userForm.value.adminPassword;
    console.log(this.admin);
  }

  generateBornDate(){
    if(this.userForm.value.bornDate._i.date < 10){
      this.day = '0' + this.userForm.value.bornDate._i.date;
    }else{
      this.day = this.userForm.value.bornDate._i.date;
    }

    if( (this.userForm.value.bornDate._i.month + 1) < 10){
      this.month = '0' + (this.userForm.value.bornDate._i.month + 1);
    }else{
      this.month = (this.userForm.value.bornDate._i.month + 1);
    }

    return this.day + '-' + this.month + '-' +this.userForm.value.bornDate._i.year ;
    //this.admin.bornDate = this.day + '-' + this.month + '-' +this.userForm.value.bornDate._i.year ;
  }

  saveData(){
    this.registerCompany();
    this.registerAdmin();

    this.companyService.insertRecord(this.company).subscribe(
      (success) =>{

        this.admin.idCompany = success.id;

        this.adminService.postRecord(this.admin).subscribe(
          (success) =>{
            console.log(success);

          },
          (err) =>{
            console.log(err);

          }
        )

      },
      (err) =>{
        console.log(err);

      }
    )

  }

  login(){

  }

}
