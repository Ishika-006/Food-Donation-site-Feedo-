import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { WebsocketService } from '../websocket.service';
import { HttpClient } from '@angular/common/http';

interface LocationDto {
  latitude: number;
  longitude: number;
}

// ✅ Icon fix must go HERE — before @Component
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/gif/marker-icon-2x.png',
  iconUrl: 'assets/gif/marker-icon.png',
  shadowUrl: 'assets/gif/marker-shadow.png',
});



@Component({
  selector: 'app-live-map',
  template: `<div id="map" style="height: 500px; width: 100%;"></div>`
})
export class LiveMapComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private deliveryMarker!: L.Marker;
  private donorMarker!: L.Marker;
  private ngoMarker!: L.Marker;
  private deliveryId!: number;
  private subscription: any;

  constructor(private wsService: WebsocketService, private http: HttpClient) {}

  ngAfterViewInit() {
    this.deliveryId = +localStorage.getItem('deliveryId')!;
    if (!this.deliveryId) {
      alert('No delivery selected for tracking');
      return;
    }

    Promise.all([
      this.http.get<LocationDto>(`http://localhost:8080/donor/deliveries/${this.deliveryId}/location`, { withCredentials: true }).toPromise(),
      this.http.get<LocationDto>(`http://localhost:8080/api/deliveries/donor/location`).toPromise(),
      this.http.get<LocationDto>(`http://localhost:8080/api/deliveries/ngo/location`).toPromise(),
    ]).then(([deliveryLoc, donorLoc, ngoLoc]) => {
      if (!deliveryLoc || !donorLoc || !ngoLoc) {
        console.error('One or more locations are missing');
        return;
      }

      this.initMap(deliveryLoc.latitude, deliveryLoc.longitude, donorLoc, ngoLoc);

      this.wsService.connect(this.deliveryId);
      this.subscription = this.wsService.onLocationUpdate().subscribe(loc => {
        if (loc) {
          console.log("📡 Received:", loc);
          this.updateDeliveryMarker(loc.latitude, loc.longitude);
        }
      });

      this.trackLocationAndSend();
    }).catch(err => {
      console.error('Error fetching initial locations', err);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private initMap(lat: number, lng: number, donorLoc: LocationDto, ngoLoc: LocationDto) {
    console.log("🗺️ Initializing map at", lat, lng);

    this.map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const deliveryIcon = L.icon({
      iconUrl: 'assets/gif/delivery-man.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    this.deliveryMarker = L.marker([lat, lng], { icon: deliveryIcon }).addTo(this.map).bindPopup('Delivery Person');
    this.donorMarker = L.marker([donorLoc.latitude, donorLoc.longitude]).addTo(this.map).bindPopup('Donor Location');
    this.ngoMarker = L.marker([ngoLoc.latitude, ngoLoc.longitude]).addTo(this.map).bindPopup('NGO Location');

    L.polyline([
      [donorLoc.latitude, donorLoc.longitude],
      [ngoLoc.latitude, ngoLoc.longitude]
    ], { color: 'blue' }).addTo(this.map);

    // ✅ Make sure map resizes properly
    setTimeout(() => this.map.invalidateSize(), 500);
  }

  private updateDeliveryMarker(lat: number, lng: number) {
    if (this.deliveryMarker) {
      this.deliveryMarker.setLatLng([lat, lng]);
      this.map.panTo([lat, lng]);
    }
  }

  private trackLocationAndSend() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        this.http.get(`http://localhost:8080/donor/deliveries/${this.deliveryId}/location`, { withCredentials: true }).subscribe();
      }, error => {
        console.error('Error tracking location', error);
      }, { enableHighAccuracy: true });
    }
  }
}
