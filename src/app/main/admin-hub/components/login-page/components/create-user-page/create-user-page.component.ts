import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss']
})
export class CreateUserPageComponent implements OnInit {

  public registerForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    name: ['', Validators.required],
    dateBirth: ['', Validators.required]
  });

  public selectList = [
    { id: 0, name: 'Cadastrar uma nova' },
    { id: 1, name: 'Teste A' },
    { id: 2, name: 'Teste B' }
  ];

  public selectedId = -1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  // conseguir mais fácil dados do form
  get f() { return this.registerForm.controls; }

  public changeSelectedCompany(e: any) {
    this.selectedId = e.target.value;
  }

  public isPasswordValid(): Boolean {
    if(this.f.password.touched && this.f.password.valid && this.f.confirmPassword.touched && this.f.confirmPassword.valid){
      return this.f.password.value === this.f.confirmPassword.value;
    }
    return true;
  }
}
