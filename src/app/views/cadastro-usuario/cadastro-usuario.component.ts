import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/sharedprincipal/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  form!: FormGroup

  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      endereco: [''],
      telefone: ['', Validators.required],
      whatsapp: ['', Validators.required],
      linkedin: ['', Validators.required],
      pretsalarial: [''],
      escolaridade: [''],
      experiencia: [''],
    });
  }

  onSalvarUsuario() {
    this.firebaseService.doRegisterUser(this.form.get('email')?.value, this.form.get('senha')?.value)
      .then((usuario: any) => {
        this.form.get('senha')?.disable;
        this.firebaseService.doCreateUsuario(this.form.value, usuario.user.uid).then(result => {
          window.alert('Usuario cadastrado com sucesso!');
        })
      })
  }
}
