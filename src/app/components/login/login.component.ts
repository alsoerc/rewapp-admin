import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor() { }

  ngOnInit() {
    this.createForm();

    this.firstFormGroup = new FormGroup({
      firstCtrl : new FormControl ('', Validators.required)
    });

    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl ('', Validators.required)
    });

  }

  createForm(){
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

  createRegisterForm(){
    this.registerForm = new FormGroup({

    })
  }

  cancel(){
    this.loginForm.reset();
  }

  saveData(){

  }

}
