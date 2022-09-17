import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/sharedprincipal/firebase.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  redirectURL: any = undefined
  
  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,    
    private HeaderService: HeaderService
  ) {
    HeaderService.headerData = {
      title: 'Login',
      icon: 'login',
      routeUrl: 'login'
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has('redirectURL') ) {
        this.redirectURL = params.get('redirectURL');
      }
    })

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  acessar() {
    this.firebaseService.login(this.form.get('email')?.value, this.form.get('password')?.value).then((result) => {
      if ( this.redirectURL ) {
        this.router.navigateByUrl(this.redirectURL)
      }
    })
  }

}
