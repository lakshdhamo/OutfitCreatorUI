import { environment } from './../../environments/environment';
import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  private apiBase = environment.apiBase;
  private headerOptions = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headerOptions.set('Content-Type', 'application/json');
  }

  get(url: string, options?: any): Observable<any> {
    return this.http.get(this.apiBase + url, options);
  }

}
