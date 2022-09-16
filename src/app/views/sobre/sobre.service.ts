import { SobreData } from './sobre-data.model';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SobreService {

  private _sobreData = new BehaviorSubject<SobreData>({
    title: 'Sobre',
    icon: 'info',
    routeUrl:''
  })

  constructor() { }

  get sobreData(): SobreData {
    return this._sobreData.value
  }

  set sobreData(sobreData: SobreData) {
    this._sobreData.next(sobreData)
  }
}


