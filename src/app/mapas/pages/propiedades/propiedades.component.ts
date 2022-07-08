import { Component  } from '@angular/core';
interface Propiedad{
  titulo:string,
  descritpion:string,
  lngLat:[number,number]
}
@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.scss']
})
export class PropiedadesComponent  {

  constructor() { }

  propiedades: Propiedad[]=[
    {
      titulo:'Casa residencial, canada',
      descritpion:'Bella cas de propiedad en Katana ,canada',
      lngLat:[4.73873170462654, -74.0481724844685]
    },
    {
      titulo:'parque',
      descritpion:'bello parque ubicado en EEuu',
      lngLat:[40.768020666495325, -74.0861524693721]
    },
    {
      titulo:'playas camcum',
      descritpion:'bellas playas ubicadas en mexico',
      lngLat:[21.166157868901806, -86.85198255931103]
    },

  ]


}
