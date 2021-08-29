import { AuthenticationService } from './../../../../services/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loading = false;

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  public hasError = false;
  public errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void { }

  // conseguir mais fácil dados do form
  get f() { return this.loginForm.controls; }

  public login(): void {
    
    if (this.loginForm.invalid)
      return

    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value).subscribe(res => {
      if (res) {
        this.loading = false;
        this.router.navigate(['admin'])
      }
    }, (err) => {
      let message = 'Falha ao comunicar com o servidor, tente novamente mais tarde :/';
      this.loading = false
      if (err.status) {
        if (err.status === 500) {
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
