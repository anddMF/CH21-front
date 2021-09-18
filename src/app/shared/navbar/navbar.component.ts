import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

export enum PageEnum {
  Reports = 1,
  Images = 2,
  Choices = 3
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() page: PageEnum = 1;
  @Output() pageSelected = new EventEmitter();
  

  constructor(private authService: AuthenticationService) { }
  public currentUser = this.authService.currentUserValue;

  ngOnInit(): void {
  }

  public changePage(selected: number) {
    this.pageSelected.emit(selected)
  }

}
