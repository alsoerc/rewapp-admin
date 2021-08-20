import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RewardService } from './../../services/reward.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {

  rewardForm: FormGroup;
  fileName = '';
  isLoading = false;
  file: any;

  constructor(private rewardService: RewardService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.generateForm();
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

    formData.append("id", "1");
    formData.append("idCompany", "2");
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


}
