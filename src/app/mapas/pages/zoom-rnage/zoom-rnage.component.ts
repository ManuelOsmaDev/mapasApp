import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-zoom-rnage',
  templateUrl: './zoom-rnage.component.html',
  styleUrls: ['./zoom-rnage.component.scss']
})
export class ZoomRnageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxTOken
    let map = new mapboxgl.Map({
      container:'mapa',
      style:'mapbox://styles/mapbox/streets-v11',
      center:[-74.16108757042778,  4.548173530870389 ],
      zoom:18
    });
  }

}
