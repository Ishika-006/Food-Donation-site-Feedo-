import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client: Client | null = null;
  private locationSubject = new Subject<any>();

  connect(deliveryId: number) {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-location'),
      reconnectDelay: 5000,
      debug: str => console.log(str)
    });

    this.client.onConnect = () => {
      this.client?.subscribe(`/topic/delivery/${deliveryId}/location`, (message: IMessage) => {
        if (message.body) {
          this.locationSubject.next(JSON.parse(message.body));
        }
      });
    };

    this.client.activate();
  }

  onLocationUpdate(): Observable<any> {
    return this.locationSubject.asObservable();
  }
}
