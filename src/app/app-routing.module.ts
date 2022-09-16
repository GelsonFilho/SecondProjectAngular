import { MateriaComponent } from './views/materia/materia.component';
import { SobreComponent } from './views/sobre/sobre.component';
import { ContatosComponent } from './views/contatos/contatos.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./views/home/home.component";
import { ProductCrudComponent } from "./views/product-crud/product-crud.component";
import { LoginComponent } from './views/login/login.component';
import { CadastroUsuarioComponent } from './views/cadastro-usuario/cadastro-usuario.component';
import { CadastroEmpresaComponent } from './views/cadastro-empresa/cadastro-empresa.component';
import { AdminGuard } from './views/admin/admin.guard';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "materia",
    component: MateriaComponent
  },
  {
    path: "contatos",
    component: ContatosComponent
  },
  {
    path: "cadastrousuario",
    component: CadastroUsuarioComponent,
    loadChildren: () => import('./views/cadastro-usuario/cadastro-usuario.module').then( m => m.CadastroUsuarioModule )
  },
  {
    path: "cadastroempresa",
    component: CadastroEmpresaComponent,
    loadChildren: () => import('./views/cadastro-empresa/cadastro-empresa.module').then( m => m.CadastroEmpresaModule )
  },
  // {
  //   path: "login",
  //   component: LoginComponent
  // },
  {
    path: 'login/:redirectURL',
    component: LoginComponent
  },
  {
    path: "admin",
    loadChildren: () => import('./views/admin/admin.module').then( m => m.AdminModule ),
    canLoad: [AdminGuard]
  },
  {
    path: "sobre",
    component: SobreComponent
  },
  {
    path: "products",
    component: ProductCrudComponent
  },
  {
    path: "products/create",
    component: ProductCreateComponent
  },
  {
    path: "products/update/:id",
    component: ProductUpdateComponent
  },
  {
    path: "products/delete/:id",
    component: ProductDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

