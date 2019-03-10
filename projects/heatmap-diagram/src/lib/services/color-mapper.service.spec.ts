import { TestBed, async } from '@angular/core/testing';

import { ColorMapperService } from './color-mapper.service';

describe('ColorMapperService', () => {
  let service: ColorMapperService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ColorMapperService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#parseColor', () => {
    it('parses shorthand hex with 3 digits', () => {
      expect(service.parseColor('#a5f')).toEqual({ r: 170, g: 85, b: 255, a: 1 });
    });

    it('parses shorthand hex with 3 digits including upper-case', () => {
      expect(service.parseColor('#A5F')).toEqual({ r: 170, g: 85, b: 255, a: 1 });
    });

    it('parses hex with 6 digits', () => {
      expect(service.parseColor('#aaf70b')).toEqual({ r: 170, g: 247, b: 11, a: 1 });
    });

    it('parsing hex fails with wrong digit count', () => {
      expect(() => service.parseColor('')).toThrow(service.InvalidColorError);
      expect(() => service.parseColor('#')).toThrow(service.InvalidColorError);
      expect(() => service.parseColor('#ab')).toThrow(service.InvalidColorError);
      expect(() => service.parseColor('#abcd')).toThrow(service.InvalidColorError);
      expect(() => service.parseColor('#abcde')).toThrow(service.InvalidColorError);
      expect(() => service.parseColor('#abcdef1')).toThrow(service.InvalidColorError);
    });

    it('parses hex fails with non-hex input', () => {
      expect(() => service.parseColor('#0ag')).toThrow(service.InvalidColorError);
      expect(() => service.parseColor('#agff00')).toThrow(service.InvalidColorError);
    });

    it('parses rgb', () => {
      expect(service.parseColor('rgb(1,255,0)')).toEqual({r: 1, g: 255, b: 0, a: 1 });
      expect(service.parseColor('rgb(0,0,0)')).toEqual({r: 0, g: 0, b: 0, a: 1 });
      expect(service.parseColor('rgb(255,255,255)')).toEqual({r: 255, g: 255, b: 255, a: 1 });
    });

    it('parses rgb with spaces', () => {
      expect(service.parseColor('rgb( 1,255, 0 )')).toEqual({r: 1, g: 255, b: 0, a: 1 });
      expect(service.parseColor('rgb(  1,255, 0    )')).toEqual({r: 1, g: 255, b: 0, a: 1 });
      expect(service.parseColor('rgb( 1, 255, 0)')).toEqual({r: 1, g: 255, b: 0, a: 1 });
    });

    it('parsing rgb fails with invalid input', () => {
      expect(() => service.parseColor('rgb(1,256,0)')).toThrow(service.InvalidColorError);
      expect(() => service.parseColor('rgb(0,0,P)')).toThrow(service.InvalidColorError);
      expect(() => service.parseColor('rgb(1,-1,0)')).toThrow(service.InvalidColorError);
    });

    it('parses rgba', () => {
      expect(service.parseColor('rgba(0,0,0,0)')).toEqual({r: 0, g: 0, b: 0, a: 0 });
      expect(service.parseColor('rgba(0,0,0,0.0)')).toEqual({r: 0, g: 0, b: 0, a: 0 });
      expect(service.parseColor('rgba(55,255,0,0.3)')).toEqual({r: 55, g: 255, b: 0, a: 0.3 });
      expect(service.parseColor('rgba(0,0,0,1)')).toEqual({r: 0, g: 0, b: 0, a: 1 });
      expect(service.parseColor('rgba(0,0,0,1.0)')).toEqual({r: 0, g: 0, b: 0, a: 1 });
    });

    it('rgba with spaces', () => {
      expect(service.parseColor('rgba( 1,255, 0 , 0 )')).toEqual({r: 1, g: 255, b: 0, a: 0 });
      expect(service.parseColor('rgba( 1, 255, 0, 0.5)')).toEqual({r: 1, g: 255, b: 0, a: 0.5 });
    });

    it('parsing rgba fails with invalid alpha value', () => {
      expect(() => service.parseColor('rgba(0,0,0,1.1)')).toThrow(service.InvalidColorError);
      expect(() => service.parseColor('rgba(0,0,0,-0.1)')).toThrow(service.InvalidColorError);
      expect(() => service.parseColor('rgba(0,0,0,2)')).toThrow(service.InvalidColorError);
    });

  });

  describe('#createMap', () => {
    it('Creates steps from one color to another', () => {
      expect(service.createMap('rgb(10 ,8 ,40)', 'rgb(40, 11, 10)', 4)).toEqual([
        {r: 10, g: 8, b: 40, a: 1},
        {r: 20, g: 9, b: 30, a: 1},
        {r: 30, g: 10, b: 20, a: 1},
        {r: 40, g: 11, b: 10, a: 1},
      ]);
    });

    it('Creates steps from one color and alpha to another', () => {
      expect(service.createMap('rgb(10 ,8 ,40, 1)', 'rgb(40, 11, 10, 0.4)', 4)).toEqual([
        {r: 10, g: 8, b: 40, a: 1},
        {r: 20, g: 9, b: 30, a: 0.8},
        {r: 30, g: 10, b: 20, a: 0.6},
        {r: 40, g: 11, b: 10, a: 0.4, }
      ]);
    });

    it('Round floating steps', () => {
      expect(service.createMap('rgb(0 ,33 ,40)', 'rgb(1, 66, 10)', 3)).toEqual([
        {r: 0, g: 33, b: 40, a: 1},
        {r: 1, g: 50, b: 25, a: 1},
        {r: 1, g: 66, b: 10, a: 1},
      ]);
    });
  });
});
