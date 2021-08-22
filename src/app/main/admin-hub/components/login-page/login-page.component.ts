import { AuthenticationService } from './../../../../services/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public userEmail = '';
  public userPassword = '';

  public hasError = false;
  public errorMessage = '';

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.authService.login(this.userEmail, this.userPassword).subscribe(res => {
      console.log('LOGIN SEM RES', res)
      if (res) {
        console.log('RESPONDEU: ', res);
        this.router.navigate(['admin'])
      }
    }, (err) => {
      console.log('CAIU LOGIN ERR: ', err);
      let message = 'Falha ao comunicar com o servidor, tente novamente mais tarde :/'
      if (err.status) {
        if(err.status === 500 ){
          console.log('login 500 ')
          message = 'Email ou senha incorretos'
        }
      }
      this.showError(message)
    })
  }

  private showError(message: string): void {
    this.hasError = true;
    this.errorMessage = message
  }
}
