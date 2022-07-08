import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { environment } from 'src/environments/environment';

interface MarcadorPerzonalizado {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.scss'],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  latitud: [number, number] = [-74.16108757042778, 4.548173530870389];

  //arreglo marcadores
  marcadores: MarcadorPerzonalizado[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxTOken;
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.latitud,
      zoom: this.zoomLevel,
    });
    this.leerLocalStorage();
  }
  irMarcador(marker: mapboxgl.Marker | undefined) {
    this.mapa.flyTo({
      center: marker?.getLngLat(),
    });
  }
  agregarMarcador() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color,
    })
      .setLngLat(this.latitud)
      .addTo(this.mapa);
    this.marcadores.push({
      color,
      marker: nuevoMarcador,
    });
    this.guardarMarcadores();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadores();
    });
  }

  guardarMarcadores() {
    const lngLatArr: MarcadorPerzonalizado[] = [];
    this.marcadores.forEach((m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      lngLatArr.push({
        color,
        center: [lng, lat],
      });
    });
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }
    const lngLatArr: MarcadorPerzonalizado[] = JSON.parse(
      localStorage.getItem('marcadores')!
    );
    console.log(lngLatArr);
    lngLatArr.forEach((m) => {
      const nuevo = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.center!)
        .addTo(this.mapa);

      this.marcadores.push({
        marker: nuevo,
        color: m.color,
      });
      nuevo.on('dragend', () => {
        this.guardarMarcadores();
      });
    });
  }
  borrarMarcador(i: number) {
    console.log('borrando');
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1);
    this.guardarMarcadores()
  }
}
