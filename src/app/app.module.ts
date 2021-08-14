import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { CompanyComponent } from './components/company/company.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { QuizComponent } from './components/quiz/quiz.component';

import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { LoginComponent } from './components/login/login.component';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompanyComponent,
    RewardsComponent,
    EmployeesComponent,
    QuizComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MomentDateModule,
    MatStepperModule,


  ],
  providers: [MatDatepickerModule,],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
