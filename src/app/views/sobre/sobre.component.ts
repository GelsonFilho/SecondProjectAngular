import { HeaderService } from './../../components/template/header/header.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  constructor(
    private router: Router,
    private HeaderService: HeaderService
    ) { 
    HeaderService.headerData = {
    title:'Sobre',
    icon:'info',
    routeUrl:'sobre'
    }
    
  }

  ngOnInit(): void {
  }

}
