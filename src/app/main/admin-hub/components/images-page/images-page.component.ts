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
  public showModalImages = false;

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

  public postImages() {
    // objeto de entrada: pega id company do user logado, precisa de um get para select de rooms,
    // get para os arc profiles também
  }

}
