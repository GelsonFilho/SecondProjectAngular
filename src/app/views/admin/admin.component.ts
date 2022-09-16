import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/sharedprincipal/firebase.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuarios$!: Observable<any>

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.usuarios$ = this.firebaseService.listarUsuarios()
  }

}
