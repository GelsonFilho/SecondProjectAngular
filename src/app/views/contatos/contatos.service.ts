import { ContatosData } from './contatos-data.model';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  private _contatosData = new BehaviorSubject<ContatosData>({
    title: 'Contatos',
    icon: 'contacts',
    routeUrl:''
  })

  constructor() { }

  get contatosData(): ContatosData {
    return this._contatosData.value
  }

  set contatosData(contatosData: ContatosData) {
    this._contatosData.next(contatosData)
  }
}


