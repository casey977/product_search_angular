import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) {}
  
  isLoggedIn:boolean = false;

  login(usr:string, pwd:string):Observable<any> {
    return this.http.post<any>('http://164.92.204.153:1337/login', {usr: usr, pwd: pwd});
  }

  logout():void {
    localStorage.removeItem('AngularToken');
    this.isLoggedIn = false;
  }

  storeToken(token:string):void {
    localStorage.setItem('AngularToken', token);
    this.isLoggedIn = true;
  }

  getToken():string|null {
    return localStorage.getItem('AngularToken');
  }  
}