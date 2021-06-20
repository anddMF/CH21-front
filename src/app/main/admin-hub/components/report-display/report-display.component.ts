import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Report } from 'src/app/main/choices-hub/models/report';
import * as moment from 'moment';
import { RoomType } from 'src/app/main/customer-home/models/room-type';
import { CustomerService } from 'src/app/main/customer-home/service/customer.service';
import { ImageFile } from 'src/app/main/choices-hub/components/image-gallery/models/image-file';

@Component({
  selector: 'app-report-display',
  templateUrl: './report-display.component.html',
  styleUrls: ['./report-display.component.scss']
})
export class ReportDisplayComponent implements OnInit, OnChanges {
  @Input() report: Report = new Report();
  @Output() goBack = new EventEmitter();
  
  public imageList: ImageFile[] = [];

  constructor(private customerSvc: CustomerService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.report && changes.report) {
      this.getImages();
    };
  }

  public exitPage() {
    this.goBack.emit();
  }

  public calculateAge(birthDate: any): number {
    return moment().diff(birthDate, 'years');
  }

  public getImages() {
    var imagesIds = this.report.r1_pic1.split(',');
    console.log("DISPLAY GET IMAGES", imagesIds)
    
    this.customerSvc.getImagesById(imagesIds).subscribe(res => {
      if (res) {
        console.log('resposta get images', res)
        this.imageList = res;
      }
    })
  }
}
