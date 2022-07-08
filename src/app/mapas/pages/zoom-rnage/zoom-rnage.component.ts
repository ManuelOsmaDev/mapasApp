import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-zoom-rnage',
  templateUrl: './zoom-rnage.component.html',
  styleUrls: ['./zoom-rnage.component.scss'],
})
export class ZoomRnageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  latitud: [number, number] = [-74.16108757042778, 4.548173530870389];
  constructor() {}

  ngOnDestroy(): void {
    this.mapa.off('zoom',()=>{})
    this.mapa.off('zoomEnd',()=>{})
    this.mapa.off('move',()=>{})
  }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxTOken;
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.latitud,
      zoom: this.zoomLevel,
    });
    this.mapa.on('zoom', (ev) => {
      const zoom = this.mapa.getZoom();
      this.zoomLevel = zoom;
    });

    this.mapa.on('zoomEnd', (ev) => {
      if (this.mapa.getZoom() >= 18) {
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', (ev) => {
      const target = ev.target;
      const { lng, lat } = target.getCenter();
      this.latitud = [lng, lat];
    });
  }
  zoomIn() {
    this.mapa.zoomIn();
  }
  zoomOut() {
    this.mapa.zoomOut();
  }
  zoomCambio(valor: string) {
    console.log(valor);
    this.mapa.zoomTo(Number(valor));
  }
}
