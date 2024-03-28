import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private AuthService:AuthService,
    private router:Router
  ){}

  loginUsername:string = '';
  loginPassword:string = '';

  loginAttempt():void {
    //console.log(this.loginUsername);
    this.AuthService.login(this.loginUsername, this.loginPassword).subscribe(
      (res) => {
        //console.log(res);
        //console.log('Succesful login!');
        this.AuthService.storeToken(res);
        this.AuthService.isLoggedIn = true;
        this.router.navigate(['/']);
      }
    );
  }
}