import { AdminService } from './service/admin.service';
import { Report } from './../choices-hub/models/report';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['./admin-hub.component.scss']
})
export class AdminHubComponent implements OnInit {
  reportList: Report[] = [];
  selectedReport: Report = new Report();

  showSingleReport = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // Apenas para teste
    this.adminService.getReports(1).subscribe(res => {
      console.log('res fora: ', res)
      if (res && res.length > 0) {
        console.log(res)
        this.reportList = res;
      }
    })
  }

  public selectReport(selected: Report) {
    console.log(selected)
    if (selected) {
      console.log('entrou selected')
      this.selectedReport = selected;
      this.showSingleReport = true;
    }
  }

}
