import { Component, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MAX_ZEILEN, MAX_SPALTEN } from '../constants';


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

  checkValues():void {
    this.data.forEach(element => {
      for(let i = 0 ; i < MAX_SPALTEN ; i++){ 
        element[i] = this.checkSingleValue(element[i]);
      }      
    });
  }

  private checkSingleValue(number) {

    if (number > 9) {
      // number /= 10;
      number = Math.floor(number/10);
    }
    if (number == 0) {
      return null;
    }
    return number;
  }

}


