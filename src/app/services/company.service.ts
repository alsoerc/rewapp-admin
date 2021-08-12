import { Company } from './../models/Company';
import { Url } from './../utils/url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url : string;

  constructor(private service: HttpClient) {
    this.url = Url.url;
  }

  getRecords(){
    return this.service.get<Company[]>(this.url + 'companies');
  }

  insertRecord(company : Company){
    return this.service.post<Company>(this.url + 'companies', company);
  }

  updateRecord(company : Company, id : number){
    return this.service.put(this.url + 'companies/' + id, company);
  }

  deleteRecord(id : number){
    return this.service.delete(this.url + 'companies/' + id);
  }

  getOneRecord(id : number){
    return this.service.get(this.url + 'companies/' + id );
  }


}
