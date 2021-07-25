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

  public profileList: string[] = [];
  public roomList: string[] = [];
  public profile: string = '';

  constructor(private customerSvc: CustomerService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.report && changes.report) {
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

    this.customerSvc.getImagesById(imagesIds).subscribe(res => {
      if (res) {
        this.imageList = res;

        this.imageList.forEach(element => {
          this.roomList.push(element.room_name);
          this.profileList.push(element.profile_name);
        });
        this.profile = this.getMostOccurrences(this.profileList)
      }
    })
  }

  private getMostOccurrences(list: string[]): string {
    var elementName = '';
    var elementCount = 0;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      var elementList = list.filter(x => x === element);

      if (elementList && elementList.length > elementCount) {
        elementCount = elementList.length;
        elementName = elementList[0];
      }
    }

    return elementName;
  }
}
