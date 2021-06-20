import { ImageView } from './models/image-view';
import { ImageFile } from './models/image-file';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerService } from 'src/app/main/customer-home/service/customer.service';
import { RoomType } from 'src/app/main/customer-home/models/room-type';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit, OnChanges {
  @Input() images: ImageFile[] = [];
  @Input() showDescriptions: boolean = false;
  @Output() done = new EventEmitter();

  public imglist: ImageFile[] = [];
  public selectedImage = new ImageFile();

  public filteredList: ImageView[] = [];

  public rooms: RoomType[] = [];

  constructor(private customerSvc: CustomerService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.images && changes.images) {
      this.filteredList = [];
      this.transformImageList();
    };
  }

  ngOnInit(): void {}

  // chamar o método em click da imagem e adicionar o objeto selecionado em uma lista, limpar a lista caso já tenha
  public handleSelection(imgId: number): void {
    const hasAllUnselected = this.filteredList.every(obj => obj.used === false) 

    if(!hasAllUnselected) {
      const usedIndex = this.filteredList.findIndex(obj => obj.used === true);
      this.filteredList[usedIndex].used = false;
    }

    const index = this.filteredList.findIndex(obj => obj.image.id == imgId);
    this.filteredList[index].used = true;
    this.selectedImage = this.filteredList[index].image;
    this.done.emit(this.selectedImage);
  }

  public transformImageList(): void {
    this.images.forEach(obj => {
      this.filteredList.push({image: obj, used : false})
    })
  }

  public getImageDescriptions(): void {

  }

  public getRooms(): void {
    this.customerSvc.getRoom().subscribe(res => {
      if (res) {
        this.rooms = res;
      }
    });
  }
}
