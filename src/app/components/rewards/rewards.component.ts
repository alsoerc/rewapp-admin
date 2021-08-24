import { Reward } from './../../models/Reward';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RewardService } from './../../services/reward.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBarConfig, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {

  //Set up mat table
  displayedColumns: String[] = ['id', 'name', 'cost',  'id2', 'id3'];
  dataSource: any;
  //Set up mat paginator and mat sort
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;


  rewardForm: FormGroup;
  fileName = '';
  isLoading = false;
  file: any;
  idCompany = Number(localStorage.getItem("idCompany"));
  idAdmin = Number(localStorage.getItem("idAdmin"));


  constructor(private rewardService: RewardService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.generateForm();
  }

  ngAfterViewInit() {
    this.getRewards();
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.file = file;
    }
  }

  saveReward() {
    this.isLoading = true;

    const formData = new FormData();

    formData.append("idCompany", this.idCompany.toString());
    formData.append("name", this.rewardForm.value.name);
    formData.append("imageUrl", "");
    formData.append("date", "01-11-2021");
    formData.append("cost", this.rewardForm.value.cost);
    formData.append("image", this.file);

    this.rewardService.postImage(formData).subscribe(
      (success) => {
        console.log(success);
        this.isLoading = false;
        this.openSnackBar("Publicado con éxito")
        this.resetForm();
        this.getRewards();
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
        this.resetForm();
      }
    )
  }

  generateForm() {
    this.rewardForm = new FormGroup({
      name: new FormControl('',
        [Validators.required]),
      image: new FormControl('', [
        Validators.required
      ]),
      cost: new FormControl('', [
        Validators.required
      ]),
    })
  }

  openSnackBar(message : string) {
    let matConfig = new MatSnackBarConfig();
    matConfig.duration = 5000;
    this.snackBar.open(message,"Cerrar", matConfig)
  }

  resetForm(){
    this.rewardForm.reset();
  }

  getRewards(){
    this.rewardService.getRecords(this.idCompany).subscribe(
      (success) =>{
        this.dataSource = new MatTableDataSource<Reward>(success);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("Getting rewards...." );
        console.log(success);


      },
      (err) =>{
        console.log(err);
      }
    )
  }


}
