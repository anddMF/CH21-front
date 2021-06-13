import { Report } from './../../models/report';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-display',
  templateUrl: './report-display.component.html',
  styleUrls: ['./report-display.component.scss']
})
export class ReportDisplayComponent implements OnInit {
  @Input() report: Report = new Report();
  
  constructor() { }

  ngOnInit(): void {
  }

}
