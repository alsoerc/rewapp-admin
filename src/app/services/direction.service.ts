import { Direction } from './../models/Direction';
import { Url } from './../utils/url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  private url : string;

  constructor(private service: HttpClient) {
    this.url = Url.url;
  }

  getRecords(){
    return this.service.get<Direction[]>(this.url + 'directions');
  }

  insertRecord(direction : Direction){
    return this.service.post<Direction>(this.url + 'directions', direction);
  }

  updateRecord(id:number, direction: Direction){
    return this.service.put(this.url + 'directions/', direction);
  }

  deleteRecord(id:number){
    return this.service.delete(this.url + 'directions/' + id);
  }

}
