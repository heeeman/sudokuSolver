import { MAX_ZEILEN, MAX_SPALTEN } from './constants';
import { Validator } from './validator';


/**
 * 
 */



/**
 * @author Kalt
 * 
 * Version 1.0
 * löst leichte und mittelschwere Soduko R�tsel
 *
 */
export class Solver {
	
	readonly MAX_ZEILEN: number = MAX_ZEILEN;
	readonly MAX_SPALTEN: number = MAX_SPALTEN;

	private sudokuGrid = [	['','','4',   '','','1',   '','2',''],
									['9','','',   '','','2',   '','6',''],
									['7','','',   '','','3',   '','4',''],
									
									['','','1',   '','8','',   '','',''],
									['','','5',   '','','',   '7','',''],
									['','','',   '','2','',   '9','',''],
									
									['','6','',   '2','','',   '','','8'],
									['','2','',   '7','','',   '','','5'],
									['','4','',   '9','','',   '3','','']
								];	
	
//	private int[][] sudokuGrid = {	{0,0,0,5,6,2,0,0,0},
//									{0,0,0,0,0,0,7,4,5},
//									{3,9,5,0,0,0,0,8,0},
//									{9,0,1,3,8,0,0,0,0},
//									{8,0,3,0,0,0,5,0,6},
//									{0,0,0,0,7,6,9,0,8},
//									{0,4,0,0,0,0,3,2,1},
//									{7,5,8,0,0,0,0,0,0},
//									{0,0,0,6,9,4,0,0,0}
//								};
    //private Vector<Integer>[][] optionen = new Vector[MAX_ZEILEN][MAX_SPALTEN];  //[Waagrecht]  [Horizontal]
    optionen = [ 
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ], 
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
        [ undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ],
]//[Waagrecht]  [Horizontal]
	
	public constructor(/*int[][]*/ sudo: string[][]){
		this.sudokuGrid = sudo ? sudo : this.sudokuGrid;
        this.init();
        console.log(this.optionen);
		
	}
	
/*	public Solver(){
		init();
		
	}*/
	
	private init(){
		//Initialisieren
		for(let zeile = 0 ; zeile < this.MAX_ZEILEN ; zeile++){
			for(let spalte = 0 ; spalte < this.MAX_SPALTEN ; spalte++){
							
				if(!this.sudokuGrid[zeile][spalte]){
					this.optionen[zeile][spalte] = [];
					
					for(let i=1 ; i < 10 ; i++){
						this.optionen[zeile][spalte].push(i);
					}					
				}				
			}
		}
	}


	public aufloesen() {
		let zahler = 2;
		let FortschrittErzielt: boolean  = true;
		while(FortschrittErzielt || (zahler != 0)){
			this.stufe1();
			this.stufe2();
			this.stufe3();  
		
			FortschrittErzielt = this.inGrideintragen();
			if(FortschrittErzielt == false) {
				zahler--;
			}else{zahler = 2;}
		}		
		return this.sudokuGrid;
	}


	
	/**
	 * entfernt aus den Optionlisten alle Zahlen welche in der Selben Zeile, Spalte oder 3er Block 
	 * bereits eingetragen sind.
	 * 
	 * Diese Stufe ermöglicht es leichte Sudoku Rätsel zu lösen
	 */
	private stufe1(): void{
		
		
		for(let zeile = 0 ; zeile < this.MAX_ZEILEN ; zeile++){
			for(let spalte = 0 ; spalte < this.MAX_SPALTEN ; spalte++){
				
				if(this.sudokuGrid[zeile][spalte]){
					let bekannteZahl = this.sudokuGrid[zeile][spalte];
					
					//die Zahl aus der Ganzen Optionszeile tilgen
					for(let optSpalte = 0 ; optSpalte < this.MAX_SPALTEN ; optSpalte++){			
						this.entferneZahl(zeile, optSpalte, bekannteZahl);
					}					
					
					//die Zahl aus der Ganzen Optionsspalte tilgen
					for(let optZeile = 0 ; optZeile < this.MAX_ZEILEN ; optZeile++){	
						this.entferneZahl(optZeile, spalte, bekannteZahl);
					}	
					
					
					//die Zahl aus der dem Ganzen Options 3er Block tilgen
					for(let blockzeile = this.getStartIndexBlock(zeile); blockzeile < this.getEndIndexBlock(zeile); blockzeile++){
						for(let blockspalte = this.getStartIndexBlock(spalte); blockspalte < this.getEndIndexBlock(spalte); blockspalte++){
							this.entferneZahl(blockzeile, blockspalte, bekannteZahl);									
						}					
					}					
				}				
			}
		}
	}

	
	getStartIndexBlock(zeile: number): number {
		return Math.floor(zeile/3)*3;
	}

	getEndIndexBlock(zeile: number): number {
		return Math.floor(zeile/3+1)*3;
	}
	
	/**
	 * ist in einer Optionliste eine Zahl einzigartig in der Zeile, Spalte oder Block, so werden die restlichen Zahlen entfernt
	 */
	private stufe2(): void{
		
		let anzahlZahlen = 0;
		let letzteZeile=0;
		let letzteSpalte=0;		
		
		for(let gesuchteZahl = 1 ; gesuchteZahl < 10 ; gesuchteZahl++){			
			//gehe alle Zeilen durch						
			for(let zeile = 0 ; zeile < this.MAX_ZEILEN ; zeile++){
				anzahlZahlen = 0;
				for(let spalte = 0 ; spalte < this.MAX_SPALTEN ; spalte++){
				
					if(this.optionen[zeile][spalte] && this.optionen[zeile][spalte].includes(gesuchteZahl)) {
						anzahlZahlen++;
						letzteZeile = zeile;
						letzteSpalte = spalte;
					}			
				}
				if(anzahlZahlen == 1){
					this.entferneExclusivZahl(letzteZeile,letzteSpalte,gesuchteZahl);
				}				
			}
			
			//gehe alle Spalten durch						
			for(let spalte = 0 ; spalte < this.MAX_SPALTEN ; spalte++){
				anzahlZahlen = 0;
				for(let zeile = 0 ; zeile < this.MAX_ZEILEN ; zeile++){
				
					if(this.optionen[zeile][spalte] && this.optionen[zeile][spalte].includes(gesuchteZahl)) {
						anzahlZahlen++;
						letzteZeile = zeile;
						letzteSpalte = spalte;
						
					}			
				}
				if(anzahlZahlen == 1){
					this.entferneExclusivZahl(letzteZeile,letzteSpalte,gesuchteZahl);
				}				
			}
			
			//gehe alle Blöcke durch	
			
			for(let offsetSpalte = 0 ; offsetSpalte < this.MAX_SPALTEN ; offsetSpalte += 3){
				for(let offsetZeile = 0 ; offsetZeile < this.MAX_ZEILEN ; offsetZeile += 3){
					anzahlZahlen = 0;
					for(let spalte = offsetSpalte ; spalte < offsetSpalte+3 ; spalte++){
						for(let zeile = offsetZeile ; zeile < offsetZeile+3 ; zeile++){
							
							if(this.optionen[zeile][spalte] && this.optionen[zeile][spalte].includes(gesuchteZahl)) {
								anzahlZahlen++;
								letzteZeile = zeile;
								letzteSpalte = spalte;
							}								
						}
					}
					
					if(anzahlZahlen == 1){
						this.entferneExclusivZahl(letzteZeile,letzteSpalte,gesuchteZahl);
					}					
				}
			}				
		}	
	}
	
	/**
	 * Suche nach Zahlen in der optionsliste welche nur ein einem Block nur in einer Zeile oder Spalte vorkommen. Wenn ja, können
	 * diese in den anderen Blöcken nicht mehr vorkommen.
	 * 
	 * Diese Stufe ermöglicht es mittelschwere Sudoku Rätsel zu lösen
	 * 
	 * 
	 * 
	 */
	private stufe3(): void{
		
		let anzahlZeilen = 0;
		let anzahlSpalten = 0;
		let ersteZahl: boolean = true;
		let zeileErsterFund = 0;
		let spalteErsterFund = 0;
		
		
		for(let gesuchteZahl = 1 ; gesuchteZahl < 10 ; gesuchteZahl++){			
			
			//gehe alle Blöcke durch	
			
			for(let offsetSpalte = 0 ; offsetSpalte < this.MAX_SPALTEN ; offsetSpalte += 3){
				for(let offsetZeile = 0 ; offsetZeile < this.MAX_ZEILEN ; offsetZeile += 3){
					
					anzahlSpalten = 0;
					anzahlZeilen = 0;
					ersteZahl = true;
					for(let spalte = offsetSpalte ; spalte < offsetSpalte+3 ; spalte++){
						for(let zeile = offsetZeile ; zeile < offsetZeile+3 ; zeile++){
							

							this.optionen[zeile][spalte] && this.optionen[zeile][spalte].includes(gesuchteZahl)

							if(this.optionen[zeile][spalte] && this.optionen[zeile][spalte].includes(gesuchteZahl)) {	
										
								if(ersteZahl){
									ersteZahl = false;
									zeileErsterFund = zeile;
									spalteErsterFund = spalte;
									anzahlZeilen++;
									anzahlSpalten++;
								}else{
									if(zeileErsterFund != zeile){
										anzahlZeilen++;
									}
									if(spalteErsterFund != spalte){
										anzahlSpalten++;
									}
								}							
							}								
						}
					}
					
					if(anzahlZeilen == 1){
						
						for(let spalte = 0 ; spalte < offsetSpalte ; spalte++){
							this.entferneZahl(zeileErsterFund, spalte, '' + gesuchteZahl);
						}
						for(let spalte = offsetSpalte+3 ; spalte < this.MAX_SPALTEN ; spalte++){
							this.entferneZahl(zeileErsterFund, spalte, '' + gesuchteZahl);
						}

					}
					
					if(anzahlSpalten == 1){
						
						for(let zeile = 0 ; zeile < offsetZeile ; zeile++){
							this.entferneZahl(zeile, spalteErsterFund, '' + gesuchteZahl);
						}
						for(let zeile = offsetZeile+3 ; zeile < this.MAX_ZEILEN ; zeile++){
							this.entferneZahl(zeile, spalteErsterFund, '' + gesuchteZahl);
						}
						
					}
				}
			}				
		}	
	 }
	
	/**
	 * Entfernt alle Zahlen aus dem Optionen Vektor ausser die angegebene
	 * @param zeile
	 * @param spalte
	 * @param exclusivZahl
	 */
	entferneExclusivZahl(zeile: number, spalte: number, exclusivZahl: number): void{		
		if(this.optionen[zeile][spalte]) {	
			this.optionen[zeile][spalte] = [exclusivZahl];
		}		
	}
	
	
	/**
	 * Entfernt die "zahl" aus dem optionen Vektor
	 * @param zeile
	 * @param spalte
	 * @param zahl
	 */
	entferneZahl(zeile: number, spalte: number, zahl: string): void{
		try{

			if(this.optionen[zeile][spalte]) {	
				
				const index = this.optionen[zeile][spalte].indexOf(Number(zahl), 0);
				if (index > -1) {
					this.optionen[zeile][spalte].splice(index, 1);
				}
			}
		} catch(err) {
			console.error(err, zeile, spalte, zahl);
		}
	}
	
	private inGrideintragen(): boolean {
		
		let geaendert: boolean = false;
		
		for(let zeile = 0 ; zeile < this.MAX_ZEILEN ; zeile++){
			for(let spalte = 0 ; spalte < this.MAX_SPALTEN ; spalte++){			
				
				if(this.optionen[zeile][spalte] != null
					&&
					this.optionen[zeile][spalte].length == 1){
					
					//wenn nur noch eine Möglichkeit übrig ist muss diese die Lösung sein					
					this.sudokuGrid[zeile][spalte] =  '' + this.optionen[zeile][spalte][0];					
					this.optionen[zeile][spalte] = null;
					geaendert = true;					
				}				
			}
		}	
		return geaendert;
	}
	
	public print(): void{
		console.log();
		
		for(let zeile = 0 ; zeile < this.MAX_ZEILEN ; zeile++){
			//waagerechte linie malen
			if(zeile%3 == 0){
				for(let i=0; i < this.MAX_SPALTEN*2+7 ; i++) console.log("-");
				console.log();
			}
			
			for(let spalte = 0 ; spalte < this.MAX_SPALTEN ; spalte++){
				//senkrechte linie malen
				if(spalte%3 == 0) console.log("| ");
				if(this.sudokuGrid[zeile][spalte]){
					console.log(this.sudokuGrid[zeile][spalte]+" ");
				}else{
					console.log("- ");
				}
				
			}
			console.log("|");
		}		
		for(let i=0; i < this.MAX_SPALTEN*2+7 ; i++) console.log("-");
		console.log();
	}
	
}
