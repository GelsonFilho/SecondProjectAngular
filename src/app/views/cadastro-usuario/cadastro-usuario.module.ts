// import { SharedModule } from './../shared/shared.module';
import { CadastroUsuarioComponent } from './cadastro-usuario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: CadastroUsuarioComponent },
];

@NgModule({
  declarations: [
    CadastroUsuarioComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
    // SharedModule
  ]
})
export class CadastroUsuarioModule { }
