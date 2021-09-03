import { UserData } from './../../../../models/user-model';
import { UserService } from './service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss']
})
export class CreateUserPageComponent implements OnInit {

  public hasError = false;
  public errorMessage = '';

  public registerForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    name: ['', Validators.required],
    dateBirth: ['', Validators.required],
    coRazaoSocial: [''],
    coCnpj: ['']
  });

  public formHasError = false;

  public selectList = [
    { id: 0, name: 'Cadastrar uma nova' },
    { id: 1, name: 'Teste A' },
    { id: 2, name: 'Teste B' }
  ];

  public selectedId = -1;

  constructor(private formBuilder: FormBuilder, private userSvc: UserService) { }

  ngOnInit(): void {
  }

  // conseguir mais fácil dados do form
  get f() { return this.registerForm.controls; }

  public changeSelectedCompany(e: any) {
    this.selectedId = e.target.value;
  }

  public createUser(): void {
    const newUser: UserData = {
      name: this.f.name.value,
      email: this.f.email.value,
      password: this.f.password.value,
      idCompany: this.selectedId,
      dtBirth: this.f.dateBirth.value,
      companyName: this.f.coRazaoSocial.value,
      companyCnpj: this.f.coCnpj.value
    }
    console.log('USER', newUser)

    this.userSvc.postUser(newUser).subscribe(res => {

    }, (err) => {
      let message = 'Falha ao comunicar com o servidor, tente novamente mais tarde :/';
      if (err.status) {
        if (err.status === 400) {
          message = 'Email já utilizado em outra conta'
        }
      }
      this.showError(message)
    })
  }

  public checkDisableButton(): Boolean {
    if(this.selectedId == -1)
      return true;

    if (this.selectedId == 0)
      return this.registerForm.invalid || !this.isCompanyDataValid() || !this.isPasswordValid()
    else
      return this.registerForm.invalid || !this.isPasswordValid()
  }

  public isPasswordValid(): Boolean {
    if (this.f.password.touched && this.f.password.valid && this.f.confirmPassword.touched && this.f.confirmPassword.valid) {
      return this.f.password.value === this.f.confirmPassword.value;
    }
    return true;
  }

  public isCompanyDataValid(): Boolean {
    if (this.f.coRazaoSocial.value === '' || this.f.coCnpj.value === '') {
      return false
    }

    return true;
  }

  private showError(message: string): void {
    this.hasError = true;
    this.errorMessage = message
  }
}
