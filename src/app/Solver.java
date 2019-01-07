import java.util.Iterator;
import java.util.Vector;

/**
 * 
 */



/**
 * @author Kalt
 * 
 * Version 1.0
 * l�st leichte und mittelschwere Soduko R�tsel
 *
 */
export class Solver {
	
	public final static int MAX_ZEILEN = 9;
	public final static int MAX_SPALTEN = 9;

	private int[][] sudokuGrid = {	{0,0,4,   0,0,1,   0,2,0},
									{9,0,0,   0,0,2,   0,6,0},
									{7,0,0,   0,0,3,   0,4,0},
									
									{0,0,1,   0,8,0,   0,0,0},
									{0,0,5,   0,0,0,   7,0,0},
									{0,0,0,   0,2,0,   9,0,0},
									
									{0,6,0,   2,0,0,   0,0,8},
									{0,2,0,   7,0,0,   0,0,5},
									{0,4,0,   9,0,0,   3,0,0}
								};	
	
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
	private Vector<Integer>[][] optionen = new Vector[MAX_ZEILEN][MAX_SPALTEN];  //[Waagrecht]  [Horizontal]
	
	public Solver(int[][] sudo){
		sudokuGrid = sudo;
		init();
		
	}
	
	public Solver(){
		init();
		
	}
	
	private void init(){
		//Initialisieren
		for(int zeile = 0 ; zeile < MAX_ZEILEN ; zeile++){
			for(int spalte = 0 ; spalte < MAX_SPALTEN ; spalte++){
							
				if(sudokuGrid[zeile][spalte] == 0){
					optionen[zeile][spalte] = new Vector<Integer>();
					
					for(int i=1 ; i < 10 ; i++){
						optionen[zeile][spalte].add(new Integer(i));
					}					
				}				
			}
		}
	}
	
	

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Solver meineLoesung = new Solver();
		
		meineLoesung.aufloesen();
		
		meineLoesung.print();
	}
	
	
	public int[][] aufloesen(){
		int zahler = 2;
		Boolean FortschrittErzielt = true;
		while(FortschrittErzielt || (zahler != 0)){
			stufe1();
			stufe2();
			stufe3();  
		
			FortschrittErzielt = inGrideintragen();
			if(FortschrittErzielt == false) {
				zahler--;
			}else{zahler = 2;}
		}		
		return sudokuGrid;
		
	}
	
	/**
	 * entfernt aus den Optionlisten alle Zahlen welche in der Selben Zeile, Spalte oder 3er Block 
	 * bereits eingetragen sind.
	 * 
	 * Diese Stufe erm�glicht es leichte Sudoku R�tsel zu l�sen
	 */
	private void stufe1(){
		
		
		for(int zeile = 0 ; zeile < MAX_ZEILEN ; zeile++){
			for(int spalte = 0 ; spalte < MAX_SPALTEN ; spalte++){
				
				if(sudokuGrid[zeile][spalte] != 0){
					int bekannteZahl = sudokuGrid[zeile][spalte];
					
					//die Zahl aus der Ganzen Optionszeile tilgen
					for(int optSpalte = 0 ; optSpalte < MAX_SPALTEN ; optSpalte++){			
						entferneZahl(zeile, optSpalte, bekannteZahl);
					}					
					
					//die Zahl aus der Ganzen Optionsspalte tilgen
					for(int optZeile = 0 ; optZeile < MAX_ZEILEN ; optZeile++){	
						entferneZahl(optZeile, spalte, bekannteZahl);
					}	
					
					
					//die Zahl aus der dem Ganzen Options 3er Block tilgen
					for(int blockzeile = (zeile/3)*3; blockzeile < (zeile/3+1)*3; blockzeile++){
						for(int blockspalte = (spalte/3)*3; blockspalte < (spalte/3+1)*3; blockspalte++){
							entferneZahl(blockzeile, blockspalte, bekannteZahl);									
						}					
					}					
				}				
			}
		}
	}
	
	/**
	 * ist in einer Optionliste eine Zahl einzigartig in der Zeile, Spalte oder Block, so werden die restlichen Zahlen entfernt
	 */
	private void stufe2(){
		
		int anzahlZahlen = 0;
		int letzteZeile=0;
		int letzteSpalte=0;		
		
		for(int gesuchteZahl = 1 ; gesuchteZahl < 10 ; gesuchteZahl++){			
			//gehe alle Zeilen durch						
			for(int zeile = 0 ; zeile < MAX_ZEILEN ; zeile++){
				anzahlZahlen = 0;
				for(int spalte = 0 ; spalte < MAX_SPALTEN ; spalte++){
				
					if(optionen[zeile][spalte] != null) {	
						Iterator<Integer> iter = optionen[zeile][spalte].iterator();
						while(iter.hasNext()){
							if(iter.next() == gesuchteZahl){
								anzahlZahlen++;
								letzteZeile = zeile;
								letzteSpalte = spalte;
							}
						}
					}			
				}
				if(anzahlZahlen == 1){
					entferneExclusivZahl(letzteZeile,letzteSpalte,gesuchteZahl);
				}				
			}
			
			//gehe alle Spalten durch						
			for(int spalte = 0 ; spalte < MAX_SPALTEN ; spalte++){
				anzahlZahlen = 0;
				for(int zeile = 0 ; zeile < MAX_ZEILEN ; zeile++){
				
					if(optionen[zeile][spalte] != null) {	
						Iterator<Integer> iter = optionen[zeile][spalte].iterator();
						while(iter.hasNext()){
							if(iter.next() == gesuchteZahl){
								anzahlZahlen++;
								letzteZeile = zeile;
								letzteSpalte = spalte;
							}
						}
					}			
				}
				if(anzahlZahlen == 1){
					entferneExclusivZahl(letzteZeile,letzteSpalte,gesuchteZahl);
				}				
			}
			
			//gehe alle Bl�cke durch	
			
			for(int offsetSpalte = 0 ; offsetSpalte < MAX_SPALTEN ; offsetSpalte += 3){
				for(int offsetZeile = 0 ; offsetZeile < MAX_ZEILEN ; offsetZeile += 3){
					anzahlZahlen = 0;
					for(int spalte = offsetSpalte ; spalte < offsetSpalte+3 ; spalte++){
						for(int zeile = offsetZeile ; zeile < offsetZeile+3 ; zeile++){
							
							if(optionen[zeile][spalte] != null) {	
								Iterator<Integer> iter = optionen[zeile][spalte].iterator();
								while(iter.hasNext()){
									if(iter.next() == gesuchteZahl){
										anzahlZahlen++;
										letzteZeile = zeile;
										letzteSpalte = spalte;
									}
								}
							}								
						}
					}
					
					if(anzahlZahlen == 1){
						entferneExclusivZahl(letzteZeile,letzteSpalte,gesuchteZahl);
					}					
				}
			}				
		}	
	}
	
	/**
	 * Suche nach Zahlen in der optionsliste welche nur ein einem Block nur in einer Zeile oder Spalte vorkommen. Wenn ja, k�nnen
	 * diese in den anderen Bl�cken nicht mehr vorkommen.
	 * 
	 * Diese Stufe erm�glicht es mittelschwere Sudoku R�tsel zu l�sen
	 * 
	 * 
	 * 
	 */
	private void stufe3(){
		
		int anzahlZeilen = 0;
		int anzahlSpalten = 0;
		boolean ersteZahl = true;
		int zeileErsterFund=0;
		int spalteErsterFund=0;
		
		
		for(int gesuchteZahl = 1 ; gesuchteZahl < 10 ; gesuchteZahl++){			
			
			//gehe alle Bl�cke durch	
			
			for(int offsetSpalte = 0 ; offsetSpalte < MAX_SPALTEN ; offsetSpalte += 3){
				for(int offsetZeile = 0 ; offsetZeile < MAX_ZEILEN ; offsetZeile += 3){
					
					anzahlSpalten = 0;
					anzahlZeilen = 0;
					ersteZahl = true;
					for(int spalte = offsetSpalte ; spalte < offsetSpalte+3 ; spalte++){
						for(int zeile = offsetZeile ; zeile < offsetZeile+3 ; zeile++){
							
							if(optionen[zeile][spalte] != null) {	
								Iterator<Integer> iter = optionen[zeile][spalte].iterator();
								while(iter.hasNext()){
									if(iter.next() == gesuchteZahl){
										
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
						}
					}
					
					if(anzahlZeilen == 1){
						
						for(int spalte = 0 ; spalte < offsetSpalte ; spalte++){
							entferneZahl(zeileErsterFund, spalte, gesuchteZahl);
						}
						for(int spalte = offsetSpalte+3 ; spalte < MAX_SPALTEN ; spalte++){
							entferneZahl(zeileErsterFund, spalte, gesuchteZahl);
						}

					}
					
					if(anzahlSpalten == 1){
						
						for(int zeile = 0 ; zeile < offsetZeile ; zeile++){
							entferneZahl(zeile, spalteErsterFund, gesuchteZahl);
						}
						for(int zeile = offsetZeile+3 ; zeile < MAX_ZEILEN ; zeile++){
							entferneZahl(zeile, spalteErsterFund, gesuchteZahl);
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
	private void entferneExclusivZahl(int zeile, int spalte, int exclusivZahl){
		
		if(optionen[zeile][spalte] != null) {	
			Iterator<Integer> iter = optionen[zeile][spalte].iterator();
			while(iter.hasNext()){
				if(iter.next() != exclusivZahl){
					iter.remove();
				}
			}
		}
		
	}
	
	
	/**
	 * Entfernt die "zahl" aus dem optionen Vektor
	 * @param zeile
	 * @param spalte
	 * @param zahl
	 */
	private void entferneZahl(int zeile, int spalte, int zahl){
		
		if(optionen[zeile][spalte] != null) {	
			Iterator<Integer> iter = optionen[zeile][spalte].iterator();
			while(iter.hasNext()){
				if(iter.next() == zahl){
					iter.remove();
				}
			}
		}
	}
	
	private boolean inGrideintragen(){
		
		boolean geaendert = false;
		
		for(int zeile = 0 ; zeile < MAX_ZEILEN ; zeile++){
			for(int spalte = 0 ; spalte < MAX_SPALTEN ; spalte++){			
				
				if(optionen[zeile][spalte] != null
					&&
					optionen[zeile][spalte].size() == 1){
					
					//wenn nur noch eine M�glichkeit �brig ist muss diese die L�sung sein					
					sudokuGrid[zeile][spalte] =  optionen[zeile][spalte].lastElement();					
					optionen[zeile][spalte] = null;
					geaendert = true;					
				}				
			}
		}	
		return geaendert;
	}
	
	public void print(){
		System.out.println();
		
		for(int zeile = 0 ; zeile < MAX_ZEILEN ; zeile++){
			//waagerechte linie malen
			if(zeile%3 == 0){
				for(int i=0; i < MAX_SPALTEN*2+7 ; i++) System.out.print("-");
				System.out.println();
			}
			
			for(int spalte = 0 ; spalte < MAX_SPALTEN ; spalte++){
				//senkrechte linie malen
				if(spalte%3 == 0) System.out.print("| ");
				if(sudokuGrid[zeile][spalte] != 0){
					System.out.print(sudokuGrid[zeile][spalte]+" ");
				}else{
					System.out.print("- ");
				}
				
			}
			System.out.println("|");
		}		
		for(int i=0; i < MAX_SPALTEN*2+7 ; i++) System.out.print("-");
		System.out.println();
	}
	
}
