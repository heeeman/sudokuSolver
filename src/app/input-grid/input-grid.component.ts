import { Component, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';



export const ELEMENT_DATA = [['1', '2', '3', '4', '5', '6', '7', '8', '9'], ['1', '2', '3', '4', '5', '6', '7', '8', '9']];

@Component({
  selector: 'app-input-grid',
  templateUrl: './input-grid.component.html',
  styleUrls: ['./input-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputGridComponent implements OnInit, OnChanges {

  @Input()
  data;

  displayedColumns = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  dataSource;// = new MatTableDataSource(this.data);




  constructor() {
    
   }

   ngOnChanges(){
    this.dataSource = new MatTableDataSource(this.data);
   }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  printArr(): void {

  }

}


