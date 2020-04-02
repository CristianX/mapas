import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

// Importación de mapbox para que todo el objeto caiga en mapboxgl
import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  mapa: Mapboxgl.Map;

  constructor() { }

  ngOnInit() {
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
    container: 'mapa-mapbox', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-78.5180446, -0.2157746], // starting position, mapbox trabaja primero con LNG, LAT
    zoom: 17 // starting zoom
    });

    // Con esa funcion se crea un marcador arrastrable en el mapa de mapbox
    this.crearMarcador(-78.5180446, -0.2157746);

  }

  crearMarcador( lng: number, lat: number  ) {

   // create the popup
  const popup = new Mapboxgl.Popup({ offset: 25 }).setText(
  'Construction on the Washington Monument began in 1848.'
  );

  const marker = new Mapboxgl.Marker(
      {
      draggable: true
      })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo( this.mapa );

  marker.on('drag', () => {
        console.log(marker.getLngLat());
      });
  }
}
