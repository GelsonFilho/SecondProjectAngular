// import { SharedModule } from './../shared/shared.module';
import { CadastroEmpresaComponent } from './cadastro-empresa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: CadastroEmpresaComponent },
];

@NgModule({
  declarations: [
    CadastroEmpresaComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
    // SharedModule
  ]
})
export class CadastroEmpresaModule { }
