import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/sharedprincipal/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {
  form!: FormGroup

  constructor(
    private HeaderService: HeaderService,
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder
  ) {
    HeaderService.headerData = {
      title: 'Cadastro de Empresas',
      icon: 'group_add',
      routeUrl: 'cadastroempresa'
    }
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      razaosocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      telefone: [''],
      whatsapp: [''],
      linkedin: [''],
      cnpj: [''],
      porte: [''],
      ehempresa: ['true'],
    });
  }

  onSalvarEmpresa() {
    this.firebaseService.doRegisterUser(this.form.get('email')?.value, this.form.get('senha')?.value)
      .then((usuario: any) => {
        this.form.get('senha')?.disable;
        this.firebaseService.doCreateUsuario(this.form.value, usuario.user.uid).then(result => {
          window.alert('Empresa cadastrada com sucesso!');
        })
      })
  }
}
