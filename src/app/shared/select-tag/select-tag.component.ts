import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-select-tag',
  templateUrl: './select-tag.component.html',
  styleUrls: ['./select-tag.component.scss']
})
export class SelectTagComponent implements OnInit, OnChanges {
  @Input() objList: any[] = [];
  @Output() selected = new EventEmitter();

  public selectedId: number = 0;
  public selectedModel: any;
  public listModel: any[] = []

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.objList && changes.objList) {
      console.log('on changes')
      this.listModel = this.objList;
    }
  }

  ngOnInit(): void {}

  public changeSelectedCompany(e: any) {
    this.selectedId = e.target.value;
    this.selectedModel = this.listModel.find(f => f.id == e.target.value);
    this.selected.emit(this.selectedModel);
  }

}
