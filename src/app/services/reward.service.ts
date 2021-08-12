import { Reward } from './../models/Reward';
import { Url } from './../utils/url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  private url : string;

  constructor(private service : HttpClient) {
    this.url = Url.url;
  }

  getRecords(idCompany : number){
    return this.service.get<Reward[]>(this.url + 'companies/' + idCompany);
  }

  postRecord(reward : Reward, idCompany : number){
    return this.service.post<Reward>(this.url + 'companies/' + idCompany +'/rewards' , reward);
  }

  getOneRecord(idCompany : number, idReward:  number){
    return this.service.get<Reward>(this.url + 'companies/' + idCompany + '/rewards/' + idReward);
  }

  deleteRcord(idCompany:number, idReward:number){
    return this.service.delete(this.url + 'companies/' + idCompany + '/rewards/' + idReward);
  }

  updateRecord(idCompany:number, idReward : number, reward: Reward){
    return this.service.put(this.url + 'companies/' + idCompany + '/rewards/' + idReward, reward);
  }




}
