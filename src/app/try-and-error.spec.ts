import { TestBed, async } from '@angular/core/testing';
import { Solver } from './solver';
import { TryAndError } from './try-and-error';




describe('Sudoku solve by try and error ', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
    }).compileComponents();
  }));



  it('should solve class 4', () => {
    let s = new Solver(null);

    let input = [
      ['', '', '', '2', '5', '', '', '', ''], 
      ['', '', '3', '', '', '', '', '', ''],
      ['5', '6', '', '', '', '8', '', '9', ''], 
      ['', '', '2', '', '1', '', '', '', '7'], 
      ['7', '8', '', '', '6', '', '', '1', '4'], 
      ['4', '', '', '', '7', '', '2', '', ''], 
      ['', '5', '', '1', '', '', '', '6', '9'], 
      ['', '', '', '', '', '', '1', '', ''], 
      ['', '', '', '', '3', '5', '', '', ''], 
  ];

  let solver = new Solver(input);
  solver.aufloesen();  

  let tryme = new TryAndError();

  input  = tryme.tryAgain(input, solver);

    const solution = JSON.stringify([
      ['8', '9', '4', '2', '5', '3', '6', '7', '1'], 
      ['2', '7', '3', '6', '9', '1', '8', '4', '5'],
      ['5', '6', '1', '7', '4', '8', '3', '9', '2'], 
      ['6', '3', '2', '5', '1', '4', '9', '8', '7'], 
      ['7', '8', '9', '3', '6', '2', '5', '1', '4'], 
      ['4', '1', '5', '8', '7', '9', '2', '3', '6'], 
      ['3', '5', '8', '1', '2', '7', '4', '6', '9'], 
      ['9', '2', '7', '4', '8', '6', '1', '5', '3'], 
      ['1', '4', '6', '9', '3', '5', '7', '2', '8'], 
  ]);
    expect(JSON.stringify(input)).toBe(solution);
  });


});
