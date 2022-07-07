import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxTOken
    let map = new mapboxgl.Map({
      container:'mapa',
      style:'mapbox://styles/mapbox/streets-v11',
      center:[-74.16108757042778,  4.548173530870389 ],
      zoom:18
    })
  }

}
