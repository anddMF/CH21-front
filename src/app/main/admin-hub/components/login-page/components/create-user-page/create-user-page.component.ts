import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss']
})
export class CreateUserPageComponent implements OnInit {
  cnpja = ''
  public selectList = [
    {id: 0, name: 'Cadastrar uma nova'},
    {id: 1, name: 'Teste A'},
    {id: 2, name: 'Teste B'}
  ];

  public selectedId = -1;

  constructor() { }

  ngOnInit(): void {
  }

  public changeSelectedCompany(e: any) {
     this.selectedId = e.target.value;
  }
}
