import { Component } from '@angular/core';
import { IonicPage, Platform ,NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { 
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker 
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map:GoogleMap;

  constructor(public navCtrl: NavController,private googleMaps: GoogleMaps,private geolocation: Geolocation) {

  }

  CargarMapa(){ 
    this.geolocation.getCurrentPosition().then(( geoposition:Geoposition) =>{ 
      let mapOptions: GoogleMapOptions = { 
        camera: { 
          target: { 
            lat: geoposition.coords.latitude, //latitud actual del usuario 
            lng: geoposition.coords.longitude// longitud actual del usuario 
          }, 
          zoom: 18, 
          tilt: 30 
        } 
      }; 
      this.map = this.googleMaps.create('map_canvas', mapOptions); 
      // MAP_READY antes de usar cualquier método. 
      this.map.one(GoogleMapsEvent.MAP_READY) .then(() => { 
        setTimeout(()=>{ 
          //crear el marcado y lo ubica en la posicion actual del usuario 
          this.map.addMarker({ 
            title: 'Estoy aqui', icon: 'blue', animation: 'DROP', position: { 
            lat: geoposition.coords.latitude, 
            lng: geoposition.coords.longitude 
          } 
        }) .then(marker => { 
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => { 
            alert('Hiciste click en mi posición'); 
          }); 
        });
        this.map.addMarker({
          title: 'Edificio A', icon: 'red', animation: 'DROP', position: { 
            lat: 13.716027, 
            lng: -89.153464 
          } 
        })
        this.map.addMarker({
          title: 'Edificio B', icon: 'red', animation: 'DROP', position: { 
            lat: 13.715786, 
            lng: -89.153453 
          }
        })
},2000); 
}) .catch(error =>{ 
  console.log(error); 
}); 
} 
) 
}

ionViewDidLoad(){ 
  this.CargarMapa(); 
}

}
