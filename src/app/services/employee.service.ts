import { Employee } from './../models/Employee';
import { Url } from './../utils/url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

private url : string;

  constructor(private service : HttpClient) {
    this.url = Url.url;
  }

  getRecords(idCompany:number){
    return this.service.get<Employee[]>(this.url + 'users/getUsersByCompany/' + idCompany);
  }

  postRecord(employee : Employee){
    return this.service.post<Employee>(this.url + 'users', employee);
  }

  updateRecord(employee : Employee, id:number){
    return this.service.put(this.url + 'users/' + id, employee);
  }

  deleteRecord(id:number){
    return this.service.delete(this.url + 'users/' + id);
  }

  validateCredentials(employee : Employee){
    return this.service.post<Employee>(this.url + 'users/loginAdmin', employee);
  }

  recoverPassword(employee:Employee){
    return this.service.put(this.url + 'users/recoverPassword', employee );
  }



}
