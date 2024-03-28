import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ListgetterService {
  constructor(
    private http:HttpClient,
    private AuthService:AuthService,
    private router:Router) {}

  getList():Observable<any> {
    const token = this.AuthService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('authorization', `Bearer ${token}`);
    }
    console.log(headers);
    return this.http.get<any>('http://164.92.204.153:1337/data', {headers});
  }
}