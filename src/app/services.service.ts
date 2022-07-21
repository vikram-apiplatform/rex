import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  httpOptions: any;

  constructor(private http: HttpClient) {
  }

  getToken() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'pkey': '3fbbb8bc5a969f503fdb66e7d90509d6',
        'apikey': '7xR2sYhqRAdfhhyu6jMo9E9hi4fRazuw'
      })
    };
    const url = 'https://dev-vikram.gateway.apiplatform.io/v1/rexLogin';

    const payload = {
      "email": "mick@foxs.com.au",
      "password": "Georgia1"
    }

    return this.http.post(url, payload, this.httpOptions)
      .pipe(map(res => res));
  }

  getListings(token: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    const url = 'https://api.rexsoftware.com/v1/rex/listings/search';

    const payload = {
      "limit": 100,
      "offset": 0,
      "criteria": [
        {"system_listing_state": "current"}
      ]
    }

    return this.http.post(url, payload, this.httpOptions)
      .pipe(map(res => res));
  }

  getProperty(token: any, id: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    const url = 'https://api.rexsoftware.com/v1/rex/properties/read';

    const payload = {
      "id": id
    }

    return this.http.post(url, payload, this.httpOptions)
      .pipe(map(res => res));
  }
}
