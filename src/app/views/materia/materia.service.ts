import { MateriaData } from './materia-data.model';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class materiaService {

  private _materiaData = new BehaviorSubject<MateriaData>({
    title: 'Materia',
    icon: 'book',
    routeUrl:''
  })

  constructor() { }

  get materiaData(): MateriaData {
    return this._materiaData.value
  }

  set materiaData(materiaData: MateriaData) {
    this._materiaData.next(materiaData)
  }
}


