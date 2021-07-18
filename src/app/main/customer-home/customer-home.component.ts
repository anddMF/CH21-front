import { Report } from './../choices-hub/models/report';
import { CustomerService } from './service/customer.service';
import { RoomType } from './models/room-type';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from './models/company';
import { WorkerUser } from './models/worker';
import { Router } from '@angular/router';
import { Customer } from './models/customer';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit {

  @Output() initialReport = new EventEmitter();
  @Output() finalRooms = new EventEmitter();
  public companies: Company[] = [];
  public rooms: RoomType[] = [];
  public workers: WorkerUser[] = [];

  public selectedCo = new Company();
  public selectedWorker = new WorkerUser();
  public selectedRooms: RoomType[] = [];

  public reportObj = new Report();
  public customerObj = new Customer();
  public nameCustomer = '';
  public emailCustomer = '';
  public dtBirthCustomer: Date = new Date();

  constructor(private customerSvc: CustomerService) { }

  ngOnInit(): void {
    this.selectedCo.id = 0;

    this.getCompanies();
    this.getRooms();
  }

  public changeSelectedCompany(e: Company): void {
    this.selectedCo = e;
    this.getWorkers();
  }

  public changeSelectedWorker(e: WorkerUser): void {
    this.selectedWorker = e;
  }

  public handleSelectedRooms(selected: RoomType[]) {
    this.selectedRooms = selected;
  }

  public getRooms(): void {
    this.customerSvc.getRoom().subscribe(res => {
      if (res) {
        this.rooms = res;
      }
    });
  }

  public getWorkers(): void {
    if (this.selectedCo) {
      this.customerSvc.getWorker(this.selectedCo.id).subscribe(res => {
        if (res) {
          this.workers = res;
        }
      });
    }
  }

  public getCompanies(): void {
    this.customerSvc.getCompany().subscribe(res => {
      if (res) {
        this.companies = res;
      }
    })
  }

  public beginButton() {
    this.customerObj.email = this.emailCustomer;
    this.customerObj.name = this.nameCustomer;
    this.customerObj.id_user_admin = this.selectedWorker.id;
    this.customerObj.dt_birth = this.dtBirthCustomer;

    this.customerSvc.postCustomer(this.customerObj).subscribe(objList => {
      console.log(objList);
      if (objList) {
        const customerCreated = objList.find(obj => obj.name === this.customerObj.name && obj.email === this.customerObj.email);
        if(customerCreated) {
          this.reportObj.id_customer = customerCreated.id;
          this.reportObj.id_company = this.selectedCo.id;
          this.reportObj.id_user_admin = this.selectedWorker.id;

          this.initialReport.emit(this.reportObj);
          this.finalRooms.emit(this.selectedRooms)
        }
      }
    });
  }

}
