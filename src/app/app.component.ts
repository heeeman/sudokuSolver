import { Component } from '@angular/core';
import { Solver } from './solver';
import { Validator } from './validator';
import { TryAndError } from './try-and-error';
import { MAX_ZEILEN, MAX_SPALTEN } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sudoku';
  isValid = true;

  ElementData = [
    ['', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '', ''], 
];

  // ElementData = [
  //                 ['', '', '', '2', '5', '', '', '', ''], 
  //                 ['', '', '3', '', '', '', '', '', ''],
  //                 ['5', '6', '', '', '', '8', '', '9', ''], 
  //                 ['', '', '2', '', '1', '', '', '', '7'], 
  //                 ['7', '8', '', '', '6', '', '', '1', '4'], 
  //                 ['4', '', '', '', '7', '', '2', '', ''], 
  //                 ['', '5', '', '1', '', '', '', '6', '9'], 
  //                 ['', '', '', '', '', '', '1', '', ''], 
  //                 ['', '', '', '', '3', '5', '', '', ''], 
  //             ];

  solve(): void {
    let solver = new Solver(this.ElementData);
    solver.aufloesen();  
    
    if (new Validator().validate(this.ElementData) !== null) {
      let tryAndError = new TryAndError();
      let result = tryAndError.tryAgain(this.ElementData, solver)
      if(result) {
        this.ElementData = result;
      }
    }
    this.isValid = new Validator().validate(this.ElementData) ? false : true;
    this.print(this.ElementData);    
  }

  
  private print(sudokuGrid){
    console.log();
    
    let stringBuffer = ''
		
		for(let zeile = 0 ; zeile < MAX_ZEILEN ; zeile++){
			//waagerechte linie malen
			if(zeile%3 == 0){
				for(let i=0; i < MAX_SPALTEN*2+7 ; i++) stringBuffer += "-";
				stringBuffer += "\n";
			}
			
			for(let spalte = 0 ; spalte < MAX_SPALTEN ; spalte++){
				//senkrechte linie malen
				if(spalte%3 == 0) stringBuffer += "| ";
				if(sudokuGrid[zeile][spalte] != 0){
					stringBuffer += sudokuGrid[zeile][spalte]+" ";
				}else{
					stringBuffer += "- ";
				}				
			}
			stringBuffer += "|\n";
		}		
		for(let i=0; i < MAX_SPALTEN*2+7 ; i++) stringBuffer += "-";
		console.log(stringBuffer);
	}
}
