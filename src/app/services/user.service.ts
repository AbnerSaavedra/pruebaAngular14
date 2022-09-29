import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL_API: string

  constructor(
    private http: HttpClient
  ) { 
    this.BASE_URL_API = environment.API_REGRES
   }

  login(object: any): Observable<any>{
    return this.http.post(this.BASE_URL_API+'login', object)
  }
}
