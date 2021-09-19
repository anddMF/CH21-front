import { AdminService } from './service/admin.service';
import { Report } from './../choices-hub/models/report';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { PageEnum } from 'src/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['./admin-hub.component.scss']
})
export class AdminHubComponent implements OnInit {
  reportList: Report[] = [];
  selectedReport: Report = new Report();

  stage = PageEnum['Reports'];

  showSingleReport = false;

  public currentUser = this.authService.currentUserValue;

  constructor(private adminService: AdminService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    //Apenas para teste
    this.adminService.getReports(this.currentUser.data.idCompany).subscribe(res => {
      if (res && res.length > 0) {
        console.log('reports', res)
        this.reportList = res;
      }
    })
  }

  public selectReport(selected: Report) {
    if (selected) {
      this.selectedReport = selected;
      this.showSingleReport = true;
    }
  }

  public handlePageOutput(selected: PageEnum) {
    this.stage = selected;
  }
}
