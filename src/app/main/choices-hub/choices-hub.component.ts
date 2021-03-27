import { ImageFile } from './components/image-gallery/models/image-file';
import { Report } from './models/report';
import { RoomType } from './../customer-home/models/room-type';
import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '../customer-home/service/customer.service';

@Component({
  selector: 'app-choices-hub',
  templateUrl: './choices-hub.component.html',
  styleUrls: ['./choices-hub.component.scss']
})
export class ChoicesHubComponent implements OnInit {
  public showHome = true;
  public showChoices = false;
  public showEnd = false;

  public reportObj = new Report();
  public imageObj = new ImageFile();

  public roomList: RoomType[] = [];
  public imageList: ImageFile[] = [];
  public filteredImageList: ImageFile[] = [];

  constructor(private customerSvc: CustomerService) { }

  ngOnInit(): void {
    this.getImages();
  }

  public getImages() {
    this.customerSvc.getImages().subscribe(res => {
      if (res) {
        this.imageList = res;
      }
    })
  }

  public handleReportOutput(initialReport: Report): void {
    if (initialReport) {
      this.reportObj = initialReport;
      console.log(this.reportObj)
      this.showHome = false;
      this.showChoices = true;
      
    }
  }

  public handleRoomsOutput(rooms: RoomType[]): void {
    console.log(rooms)
    this.roomList = rooms;
    this.imageOrquestration();
  }

  public handleImageOutput(selectedImage: ImageFile): void {
    this.imageObj = selectedImage;
  }

  public addImageToReport(): void {
    if(this.imageObj && this.imageObj.id) {
      this.reportObj.r_key = this.reportObj.r_key + '' + this.imageObj.id + ';';
    }
  }

  public imageOrquestration() {
    this.addImageToReport();
    // roomlist vai vim com clicked true, posso passar para false
    const filteredRooms = this.roomList.filter(obj => obj.clicked === true);
    console.log(filteredRooms)

    if (filteredRooms.length > 0) {
      // nova lista de imagens a serem mostradas
      const room = filteredRooms[0].id;
      this.filteredImageList = this.imageList.filter(obj => obj.id_room_type === room);
      console.log(this.filteredImageList)
      // altera o clicked no roomList pois ele ta sendo usado para identificar qual room
      // será mostrado em seguida nas imagens
      const index = this.roomList.findIndex(obj => obj.id === filteredRooms[0].id);
      this.roomList[index].clicked = false;
    } else {
      this.finishReport;
      console.log(this.reportObj)
      this.showChoices = false;
      this.showEnd = true;
    }
  }

  public finishReport() {
    this.customerSvc.postReport(this.reportObj).subscribe(res => {
      if(res) {
        console.log(res)
      }
    })
    // console.log(this.reportObj)
  }

}
