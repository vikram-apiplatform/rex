import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'pkey': '3fbbb8bc5a969f503fdb66e7d90509d6',
      'apikey': '7xR2sYhqRAdfhhyu6jMo9E9hi4fRazuw'
    })
  };

  constructor(private http: HttpClient) {

  }

  getListing() {

    const url = 'https://dev-vikram.gateway.apiplatform.io/v1/rexListing';

    return this.http.get(url, this.httpOptions)
      .pipe(map(res => res));
  }

  getPublishedListing() {

    const url = 'https://dev-vikram.gateway.apiplatform.io/v1/rexPublishedListings';

    return this.http.get(url, this.httpOptions)
      .pipe(map(res => res));
  }

  getProperty(id: any) {

    const url = 'https://dev-vikram.gateway.apiplatform.io/v1/rexProperty?id=' + id;

    return this.http.get(url, this.httpOptions)
      .pipe(map(res => res));
  }
}
