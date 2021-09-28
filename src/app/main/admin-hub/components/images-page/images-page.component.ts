import { ArcProfile } from './../../models/arc-profile';
import { RoomType } from './../../../customer-home/models/room-type';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { ImageFile } from 'src/app/main/choices-hub/components/image-gallery/models/image-file';
import { CustomerService } from 'src/app/main/customer-home/service/customer.service';

@Component({
  selector: 'app-images-page',
  templateUrl: './images-page.component.html',
  styleUrls: ['./images-page.component.scss']
})
export class ImagesPageComponent implements OnInit {
  public imageList: ImageFile[] = [];
  public roomList: RoomType[] = [];
  public profileList: ArcProfile[] = [];

  public selectedRoom: RoomType = new RoomType();
  public selectedProfile: ArcProfile = new ArcProfile();
  public imageUrl: string = '';
  public imageTitle: string = '';

  public showModalImages = false;

  constructor(private customerSvc: CustomerService, private adminSvc: AdminService) { }

  ngOnInit(): void {
    this.getImages();
  }

  public handleModal(action: boolean) {
    this.showModalImages = action;

    // faz o get duplo somente quando abrem o modal e ainda não foi feito
    if(action && this.roomList.length === 0) {
      this.getRooms();
      this.getArcProfiles();
    }
  }

  public changeSelectedRoom(room: any){
    this.selectedRoom = room;
  }

  public changeSelectedProfile(profile: any) {
    this.selectedProfile = profile;
  }

  public getImages() {
    this.customerSvc.getImages().subscribe(res => {
      if (res) {
        this.imageList = res;
      }
    })
  }

  public getRooms() {
    this.adminSvc.getRoom().subscribe(res => {
      if(res) {
        this.roomList = res;
      }
    }, (err) => {
      console.log('erro getRoom na images-page');
    })
  }

  public getArcProfiles() {
    this.adminSvc.getArcProfile().subscribe(res => {
      if(res) {
        this.profileList = res;
      }
    }, (err)=> {
      console.log('erro getArcProfile na images-page');
    })
  }

  public postImage() {
    var model = new ImageFile();
    model.base_image = this.imageUrl;
    model.name = this.imageTitle;
    model.id_arc_profile = this.selectedProfile.id;
    model.id_room_type = this.selectedRoom.id;
    
    this.adminSvc.postImage(model).subscribe(res => {
      if(res){
        console.log('res postImage', res);
        this.handleModal(false);
      }
    })
  }

}
