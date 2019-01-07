import { Solver } from './solver';
import { MAX_ZEILEN, MAX_SPALTEN } from './constants';
import { Validator } from './validator';

class TryObject {
    column: number = 3;
    row: number = 2;

    increment() {
        this.column++;
        if(this.column >= MAX_ZEILEN) {
            this.column = 0;
            this.row++;
        }
    }
}

export class TryAndError {

    optionen: [][][];
	readonly MAX_ZEILEN: number = MAX_ZEILEN;
	readonly MAX_SPALTEN: number = MAX_SPALTEN;


    public tryAgain(sudoku: string[][], solv: Solver) {

        this.optionen = solv.optionen;
        let tryPoint= new TryObject();

        while (tryPoint.row < this.MAX_ZEILEN && tryPoint.column < this.MAX_SPALTEN) {         
                       
            let run: number = this.optionen[tryPoint.row][tryPoint.column] ? this.optionen[tryPoint.row][tryPoint.column].length : 0;
            
            while (run > 0) {
                
                let a = JSON.parse(JSON.stringify(sudoku));
                
                a[tryPoint.row][tryPoint.column] = '' + this.optionen[tryPoint.row][tryPoint.column][run - 1];
                
                let solAgain = new Solver(a);
                solAgain.aufloesen();
                
                let vali = new Validator();
                
                if (vali.validate(a) == null) {
                    // eine Lösung gefunden
                    return a;
                }      
                run--;    
            }
            tryPoint.increment();
        }
        return null;
    }


    private findTry(): any {

        let select = {
            size: 99,
            row: 0,
            column: 0
        };

        for (let zeile = 0; zeile < this.MAX_ZEILEN; zeile++) {
            for (let spalte = 0; spalte < this.MAX_SPALTEN; spalte++) {

                if (this.optionen[zeile][spalte] && this.optionen[zeile][spalte].length < select.size) {
                    select.size = this.optionen[zeile][spalte].length;
                    select.row = zeile;
                    select.column = spalte;
                }
            }
        }

        return select;

    }
}