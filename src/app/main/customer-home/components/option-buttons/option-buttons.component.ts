import { RoomType } from './../../models/room-type';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-option-buttons',
  templateUrl: './option-buttons.component.html',
  styleUrls: ['./option-buttons.component.scss']
})
export class OptionButtonsComponent implements OnInit, OnChanges {
  @Input() optionsList: RoomType[] = [];
  @Output() selected = new EventEmitter();

  public selectedList: RoomType[] = [];
  public roomList: RoomType[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.optionsList) {
      this.roomList = this.optionsList;
    }
  }

  ngOnInit(): void {
  }

  public checkOption(roomId: number) {
    const selectedIndex = this.roomList.findIndex(obj => obj.id == roomId);
    this.roomList[selectedIndex].clicked = !this.roomList[selectedIndex].clicked;

    if (this.roomList[selectedIndex].clicked) {
      this.selectedList.push(this.roomList[selectedIndex]);
      this.selected.emit(this.selectedList);
    }
    else {
      const removeIndex = this.selectedList.findIndex(obj => obj.id == roomId);
      this.selectedList.splice(removeIndex, 1);
      this.selected.emit(this.selectedList);
    }
  }

}
