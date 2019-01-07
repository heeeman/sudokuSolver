import { TestBed, async } from '@angular/core/testing';
import { Solver } from './solver';


describe('solver', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
    }).compileComponents();
  }));

  
  it('optionen should be initialized', () => {
    let s = new Solver(null);
    expect(JSON.stringify(s.optionen[0][0])).toBe(JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    expect(JSON.stringify(s.optionen[1][1])).toBe(JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    expect(JSON.stringify(s.optionen[0][2])).toBe(JSON.stringify(undefined));
    expect(JSON.stringify(s.optionen[8][8])).toBe(JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    expect(JSON.stringify(s.optionen[8][9])).toBe(undefined);
    expect(JSON.stringify(s.optionen[9])).toBe(undefined);
  });

  it('should remove first number', () => {
    let s = new Solver(null); 
    s.entferneZahl(0, 0, '1');
    expect(JSON.stringify(s.optionen[0][0])).toBe(JSON.stringify([2, 3, 4, 5, 6, 7, 8, 9]));
  });

  it('should remove last number', () => {
    let s = new Solver(null); 
    s.entferneZahl(0, 0, '9');
    expect(JSON.stringify(s.optionen[0][0])).toBe(JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]));
  });

  it('should remove third number', () => {
    let s = new Solver(null); 
    s.entferneZahl(0, 0, '3');
    expect(JSON.stringify(s.optionen[0][0])).toBe(JSON.stringify([1, 2, 4, 5, 6, 7, 8, 9]));
  });

  it('should remove exclusive first number', () => {
    let s = new Solver(null); 
    s.entferneExclusivZahl(0, 0, 1);
    expect(JSON.stringify(s.optionen[0][0])).toBe(JSON.stringify([1]));
  });

  it('should remove exclusive last number', () => {
    let s = new Solver(null); 
    s.entferneExclusivZahl(0, 0, 9);
    expect(JSON.stringify(s.optionen[0][0])).toBe(JSON.stringify([9]));
  });

  it('should remove exclusive third number', () => {
    let s = new Solver(null); 
    s.entferneExclusivZahl(0, 0, 3);
    expect(JSON.stringify(s.optionen[0][0])).toBe(JSON.stringify([3]));
  });


});

describe('solver Block Zeilen / Spalten', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
    }).compileComponents();
  }));

  it('should get corret start row', () => {
    let s = new Solver(null);
    expect(s.getStartIndexBlock(0)).toBe(0, 'index 0');
    expect(s.getStartIndexBlock(1)).toBe(0, 'index 1');
    expect(s.getStartIndexBlock(2)).toBe(0, 'index 2');
    expect(s.getStartIndexBlock(3)).toBe(3, 'index 3');
    expect(s.getStartIndexBlock(4)).toBe(3, 'index 4');
    expect(s.getStartIndexBlock(5)).toBe(3, 'index 5');
    expect(s.getStartIndexBlock(6)).toBe(6, 'index 6');
    expect(s.getStartIndexBlock(7)).toBe(6, 'index 7');
    expect(s.getStartIndexBlock(8)).toBe(6, 'index 8');
  });

  it('should get corret end row', () => {
    let s = new Solver(null);
    expect(s.getEndIndexBlock(0)).toBe(3, 'index 0');
    expect(s.getEndIndexBlock(1)).toBe(3, 'index 1');
    expect(s.getEndIndexBlock(2)).toBe(3, 'index 2');
    expect(s.getEndIndexBlock(3)).toBe(6, 'index 3');
    expect(s.getEndIndexBlock(4)).toBe(6, 'index 4');
    expect(s.getEndIndexBlock(5)).toBe(6, 'index 5');
    expect(s.getEndIndexBlock(6)).toBe(9, 'index 6');
    expect(s.getEndIndexBlock(7)).toBe(9, 'index 7');
    expect(s.getEndIndexBlock(8)).toBe(9, 'index 8');
  });
});



describe('solve Sudoku ', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
    }).compileComponents();
  }));

  it('should solve class 3', () => {
    let s = new Solver(null);

    const input = [
      ['5', '', '', '', '9', '', '', '', ''], 
      ['', '9', '3', '', '', '', '', '6', ''],
      ['', '', '', '', '4', '5', '8', '', ''], 
      ['', '', '', '2', '3', '', '1', '', ''], 
      ['3', '', '', '', '', '', '', '', '9'], 
      ['', '', '7', '', '8', '4', '', '', ''], 
      ['', '', '9', '1', '7', '', '', '', ''], 
      ['', '1', '', '', '', '', '6', '2', ''], 
      ['', '', '', '', '6', '', '', '', '5'], 
  ];

  let solver = new Solver(input);
  solver.aufloesen();  

    const solution = JSON.stringify([
      ['5', '4', '6', '8', '9', '3', '2', '7', '1'],
      ['8', '9', '3', '7', '2', '1', '5', '6', '4'],
      ['2', '7', '1', '6', '4', '5', '8', '9', '3'],
      ['9', '8', '5', '2', '3', '7', '1', '4', '6'],
      ['3', '2', '4', '5', '1', '6', '7', '8', '9'],
      ['1', '6', '7', '9', '8', '4', '3', '5', '2'],
      ['6', '5', '9', '1', '7', '2', '4', '3', '8'],
      ['4', '1', '8', '3', '5', '9', '6', '2', '7'],
      ['7', '3', '2', '4', '6', '8', '9', '1', '5'],
    ]);
    expect(JSON.stringify(input)).toBe(solution);
  });

});
