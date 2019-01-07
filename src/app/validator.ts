import { MAX_ZEILEN, MAX_SPALTEN } from './constants';

export class Validator{

    readonly MAX_ZEILEN: number = MAX_ZEILEN;
	readonly MAX_SPALTEN: number = MAX_SPALTEN;

    validate(sudoku: string[][]): any {

        const ref = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        // check alle zeilen auf valid
		for(let zeile = 0 ; zeile < this.MAX_ZEILEN ; zeile++){
            const refCopy = [...ref];            
			for(let spalte  = 0; spalte < this.MAX_SPALTEN ; spalte++){
                this.removeElementFromArray(sudoku[zeile][spalte], refCopy);			
            }
            if (refCopy.length) {
                // nicht alle entfernt -> es muss fehlende oder doppelte haben
                return {row: zeile, column: undefined, remainedElements: refCopy}
            }
        }

        // check alle zeilen auf valid
        for(let spalte = 0; spalte < this.MAX_SPALTEN ; spalte++){		
            const refCopy = [...ref];
            for(let zeile = 0 ; zeile < this.MAX_ZEILEN ; zeile++){	
                this.removeElementFromArray(sudoku[zeile][spalte], refCopy);			
            }
            if (refCopy.length) {
                // nicht alle entfernt -> es muss fehlende oder doppelte haben
                return {row: undefined, column: spalte, remainedElements: refCopy}
            }
        }

        return null;
    }

    	/**
	 * Entfernt die "zahl" aus einem Array
	 * @param number to remove
	 * @param arr
	 */
	removeElementFromArray(num: string , arr: string[]): void{
		try{			
            const index = arr.indexOf(num, 0);
            if (index > -1) {
                arr.splice(index, 1);
            }			
		} catch(err) {
			console.error(err, num, arr);
		}
	}

}