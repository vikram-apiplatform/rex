import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'pkey':environment.pkey,
      'apikey': environment.apikey
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

    const url = 'https://dev-vikram.gateway.apiplatform.io/v2/rexProperty?id=' + id;

    return this.http.get(url, this.httpOptions)
      .pipe(map(res => res));
  }

  getProperties(ids: any) {

    const payload = {
      'ids' : ids
    }

    const url = 'https://dev-vikram.gateway.apiplatform.io/v2/rexproperties';

    return this.http.post(url, payload, this.httpOptions)
      .pipe(map(res => res));
  }
}
