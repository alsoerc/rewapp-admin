import { LoginComponent } from './components/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CompanyComponent } from './components/company/company.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'empresa', component: CompanyComponent},
  {path: 'empleados', component: EmployeesComponent},
  {path: 'recompensas', component: RewardsComponent},
  {path: 'encuestas', component: QuizComponent},
  {path: '**', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
