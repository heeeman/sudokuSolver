import { TestBed, async } from '@angular/core/testing';
import { Validator } from './validator';


describe('validator', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
    }).compileComponents();
  }));

  it('should validate valid sudoku', () => {

    const data = [
      ['5', '4', '6', '8', '9', '3', '2', '7', '1'],
      ['8', '9', '3', '7', '2', '1', '5', '6', '4'],
      ['2', '7', '1', '6', '4', '5', '8', '9', '3'],
      ['9', '8', '5', '2', '3', '7', '1', '4', '6'],
      ['3', '2', '4', '5', '1', '6', '7', '8', '9'],
      ['1', '6', '7', '9', '8', '4', '3', '5', '2'],
      ['6', '5', '9', '1', '7', '2', '4', '3', '8'],
      ['4', '1', '8', '3', '5', '9', '6', '2', '7'],
      ['7', '3', '2', '4', '6', '8', '9', '1', '5'],
    ];
    let s = new Validator();    
    expect(s.validate(data)).toBeNull();
  });
  
  it('should validate second row missing num', () => {

    const data = [
      ['5', '4', '6', '8', '9', '3', '2', '7', '1'],
      ['8', '', '3', '7', '2', '1', '5', '6', '4'],
      ['2', '7', '1', '6', '4', '5', '8', '9', '3'],
      ['9', '8', '5', '2', '3', '7', '1', '4', '6'],
      ['3', '2', '4', '5', '1', '6', '7', '8', '9'],
      ['1', '6', '7', '9', '8', '4', '3', '5', '2'],
      ['6', '5', '9', '1', '7', '2', '4', '3', '8'],
      ['4', '1', '8', '3', '5', '9', '6', '2', '7'],
      ['7', '3', '2', '4', '6', '8', '9', '1', '5'],
    ];
    let s = new Validator();    
    expect(JSON.stringify(s.validate(data))).toBe(JSON.stringify({row: 1, column: undefined, remainedElements: ['9']}));
  });

  it('should validate second row invalid num', () => {

    const data = [
      ['5', '4', '6', '8', '9', '3', '2', '7', '1'],
      ['8', '9', '3', '7', '2', '55', '5', '6', '4'],
      ['2', '7', '1', '6', '4', '5', '8', '9', '3'],
      ['9', '8', '5', '2', '3', '7', '1', '4', '6'],
      ['3', '2', '4', '5', '1', '6', '7', '8', '9'],
      ['1', '6', '7', '9', '8', '4', '3', '5', '2'],
      ['6', '5', '9', '1', '7', '2', '4', '3', '8'],
      ['4', '1', '8', '3', '5', '9', '6', '2', '7'],
      ['7', '3', '2', '4', '6', '8', '9', '1', '5'],
    ];
    let s = new Validator();    
    expect(JSON.stringify(s.validate(data))).toBe(JSON.stringify({row: 1, column: undefined, remainedElements: ['1']}));
  });

  it('should validate third row double num', () => {

    const data = [
      ['5', '4', '6', '8', '9', '3', '2', '7', '1'],
      ['8', '9', '3', '7', '2', '1', '5', '6', '4'],
      ['2', '7', '1', '6', '4', '4', '8', '9', '3'],
      ['9', '8', '5', '2', '3', '7', '1', '4', '6'],
      ['3', '2', '4', '5', '1', '6', '7', '8', '9'],
      ['1', '6', '7', '9', '8', '4', '3', '5', '2'],
      ['6', '5', '9', '1', '7', '2', '4', '3', '8'],
      ['4', '1', '8', '3', '5', '9', '6', '2', '7'],
      ['7', '3', '2', '4', '6', '8', '9', '1', '5'],
    ];
    let s = new Validator();    
    expect(JSON.stringify(s.validate(data))).toBe(JSON.stringify({row: 2, column: undefined, remainedElements: ['5']}));
  });


  it('should validate third column double num', () => {

    const data = [
      ['5', '4', '6', '8', '9', '3', '2', '7', '1'],
      ['8', '9', '3', '7', '2', '1', '5', '6', '4'],
      ['2', '7', '6', '1', '4', '5', '8', '9', '3'],
      ['9', '8', '5', '2', '3', '7', '1', '4', '6'],
      ['3', '2', '4', '5', '1', '6', '7', '8', '9'],
      ['1', '6', '7', '9', '8', '4', '3', '5', '2'],
      ['6', '5', '9', '1', '7', '2', '4', '3', '8'],
      ['4', '1', '8', '3', '5', '9', '6', '2', '7'],
      ['7', '3', '2', '4', '6', '8', '9', '1', '5'],
    ];
    let s = new Validator();    
    expect(JSON.stringify(s.validate(data))).toBe(JSON.stringify({row: undefined, column: 2, remainedElements: ['1']}));
  });

});
