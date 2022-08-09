import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucessComponent } from './sucess/sucess.component';

const routes: Routes = [
  { path: 'success', component: SucessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
