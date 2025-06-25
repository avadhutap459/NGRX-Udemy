import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'register',
    loadChildren:() => import('./auth/auth-routing-module').then((m)=>m.RegisterRoute)
  },
  {
    path:'login',
    loadChildren:()=> import('./auth/auth-routing-module').then((m) => m.LoginRoute)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
