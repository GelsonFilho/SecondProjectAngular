import { HeaderService } from './../../components/template/header/header.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CepService } from 'src/app/components/shared/cep.service';
@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css'],
  providers: [
    CepService
  ]
})
export class ContatosComponent implements OnInit {

  form!: FormGroup;
  nome: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  cep_endereco: FormControl = new FormControl("", [Validators.required]);
  logradouro_endereco: FormControl = new FormControl("");
  bairro_endereco: FormControl = new FormControl("");
  cidade_endereco: FormControl = new FormControl("");
  uf_endereco: FormControl = new FormControl("");
  num_endereco: FormControl = new FormControl("");
  mensagem: FormControl = new FormControl("", [Validators.required, Validators.maxLength(256)]);
  honeypot: FormControl = new FormControl(""); // usaremos isso para evitar spam
  submitted: boolean = false; // mostrar e ocultar a mensagem de sucesso
  isLoading: boolean = false; // desative o botão enviar se estivermos carregando
  responseMessage!: string; // a mensagem de resposta para mostrar ao usuário


  constructor(
    private router: Router,
    private HeaderService: HeaderService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cepService: CepService
  ) {


    HeaderService.headerData = {
      title: 'Contatos',
      icon: 'contacts',
      routeUrl: 'contatos'
    }
    this.form = this.formBuilder.group({
      nome: this.nome,
      email: this.email,
      cep_endereco: this.cep_endereco,
      logradouro_endereco: this.logradouro_endereco,
      bairro_endereco: this.bairro_endereco,
      cidade_endereco: this.cidade_endereco,
      uf_endereco: this.uf_endereco,
      num_endereco: this.num_endereco,
      mensagem: this.mensagem,
      honeypot: this.honeypot,
    });
  }



  ngOnInit(): void {
    this.form.get('cep_endereco')?.valueChanges.pipe(
      debounceTime(500),
      map((cep: string) => {
        const _cep = cep.replace(/[_\W]+/g, '');
        return _cep.length == 8 ? _cep : undefined;
      }),
      switchMap(cep => {
        return cep ? this.cepService.buscaCEP(cep) : of(undefined)
      })
    ).subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.form.get('logradouro_endereco')?.setValue(result.logradouro);
        this.form.get('bairro_endereco')?.setValue(result.bairro);
        this.form.get('cidade_endereco')?.setValue(result.localidade);
        this.form.get('uf_endereco')?.setValue(result.uf);
      }
    })
  }

  onSubmit() {
    if (this.form.status == "VALID" && this.honeypot.value == "") {
      this.form.disable(); // desative o formulário se for válido desativar vários envios
      var formData: any = new FormData();
      formData.append("nome", this.form.get("nome")!.value);
      formData.append("mensagem", this.form.get("mensagem")!.value);
      formData.append("email", this.form.get("email")!.value);
      formData.append("cep", this.form.get("cep_endereco")!.value);
      formData.append("logradouro", this.form.get("logradouro_endereco")!.value);
      formData.append("bairro", this.form.get("bairro_endereco")!.value);
      formData.append("cidade", this.form.get("cidade_endereco")!.value);
      formData.append("uf", this.form.get("uf_endereco")!.value);
      formData.append("num", this.form.get("num_endereco")!.value);
      this.isLoading = true; // enviando a solicitação de postagem assíncrona para que esteja em andamento
      this.submitted = false; // ocultar a mensagem de resposta em vários envios
      this.http.post("https://script.google.com/macros/s/AKfycbx-mE1qXWVMhPOt7Djqwi22O4nFx5oXMJtGfPHjypwysz3RZH_myfmmJv0n6t3AvOmf/exec", formData).subscribe(
        (response: any) => {
          // choose the response mensagem
          console.log(response);
          if (response["result"] == "success") {
            this.responseMessage = "Obrigado pelo seu contato! Retornaremos em breve!";
          } else {
            this.responseMessage = "Ops! Algo deu errado... Recarregue a página e tente novamente.";
          }
          this.form.enable(); // reativar o formulário após um sucesso
          this.submitted = true; // mostrar a mensagem de resposta
          this.isLoading = false; // reative o botão enviar
          console.log(response);
        },
        (error) => {
          this.responseMessage = "Ops! Ocorreu um erro... Recarregue a página e tente novamente.";
          this.form.enable(); // reativar o formulário após um sucesso
          this.submitted = true; // mostrar a mensagem de resposta
          this.isLoading = false; // reative o botão enviar
          console.log(error);
        }
      );
    }
  }
}