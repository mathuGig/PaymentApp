import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post {
  cardSchemeId: Number;
  cardNumber: string;
  expiry: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'https://uat3ds.2c2p.com/emv3ds/mockservice';

  constructor(private http: HttpClient) {}

  getType(): Observable<any> {
    const url =
      'https://uat3ds.2c2p.com/emv3ds/mockservice/masterdata/cardschemes';

    return this.http.get(url);
  }

  payment(body: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    console.log('service payment', body);
    const url = 'https://uat3ds.2c2p.com/emv3ds/mockservice/payment';

    return this.http.post(url, body, { headers });
  }

  getData() {
    const data = {
      product: 'ABCD',
      Date: '08/09/2019 12:03:44',
      Amount: 1123.03,
      Currency: 'USD',
    };

    return data;
  }
}
