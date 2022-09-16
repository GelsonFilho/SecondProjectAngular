import { HeaderService } from './../../components/template/header/header.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  constructor( private router: Router,
    private HeaderService: HeaderService) { 
      HeaderService.headerData = {
        title:'Matéria',
        icon:'book',
        routeUrl:'materia'
        }
    }

  ngOnInit(): void {
  }

}
