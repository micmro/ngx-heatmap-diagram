import { Injectable } from '@angular/core';
import { RGBA } from './color-mapper';

@Injectable({
  providedIn: 'root'
})
export class ColorMapperService {

  private rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\s*\)$/;
  private hexRegex = /^(?:#)([0-9a-f]{3,6})$/i;

  InvalidColorError = TypeError('Invalid color input, must be a valid Hex, RGB or RGBA CSS color');

  constructor() { }

  /**
   * Creates an array of colors based on the `steps` between `colorStart` and `colorEnd`
   * @param colorStart Start color sting (hex, rgb or rgba CSS color syntax)
   * @param colorEnd End color sting (hex, rgb or rgba CSS color syntax)
   * @param steps Number of color steps that should be created from `colorStart` to `colorEnd`
   */
  createMap(colorStart: string, colorEnd: string, steps: number): RGBA[] {
    const a = this.parseColor(colorStart);
    const b = this.parseColor(colorEnd);
    return new Array(steps).fill(undefined).map((val, i): RGBA => ({
      r: this.getStep(a.r, b.r, i, steps),
      g: this.getStep(a.g, b.g, i, steps),
      b: this.getStep(a.b, b.b, i, steps),
      a: this.getStep(a.a, b.a, i, steps)
    }));
  }

  /**
   * Parses an hex, rgb or rgba CSS string to an `RGBA` object
   *
   * Exampe: `"#cf0"`, `"#f0aa7f"`, `"rgb(0,255,40)"`, `"rgba(255, 255, 255, 0.5)"`
   * @param color CSS color sting (hex, rgb or rgba)
   */
  parseColor(color: string): RGBA {
    const hexMatch = color.match(this.hexRegex);
    const rgbaMatch = color.match(this.rgbaRegex);
    if (hexMatch) {
      const hex = hexMatch[1];
      if (hex.length === 3) {
        return this.hexToRgb(hex[0], hex[1], hex[2]);
      } else if (hex.length === 6) {
        return this.hexToRgb(hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6));
      }
    }
    if (rgbaMatch) {
      return {
        r: this.parseRgbComponent(rgbaMatch[1]),
        g: this.parseRgbComponent(rgbaMatch[2]),
        b: this.parseRgbComponent(rgbaMatch[3]),
        a: this.parseAlpha(rgbaMatch[4])
      };
    }

    throw this.InvalidColorError;
  }

  /**
   * Caluclates a step value between `a` and `b`
   */
  private getStep(a: number, b: number, index: number, steps: number): number {
    if (a === b) {
      return a;
    }
    const diff = b - a;
    return Math.round(a + (diff / (steps - 1) * index));
  }

  /**
   * Convers a hexadecimal single color string to it's decimal equivalent
   * @param hex : 1 or 2 digit hecadecimal sting
   */
  private hexToDecimal(hex: string): number {
    let str = hex;
    if (hex.length === 1) {
      str = `${hex}${hex}`;
    }
    return parseInt(str, 16);
  }

  /**
   * Convets the hex values to `RGBA` object
   * @param rHex hecadecimal Red component (1 or 2 digit hecadecimal sting)
   * @param gHex hecadecimal Green component (1 or 2 digit hecadecimal sting)
   * @param bHex hecadecimal Blue component (1 or 2 digit hecadecimal sting)
   */
  private hexToRgb(rHex: string, gHex: string, bHex: string): RGBA {
    return {
      r: this.hexToDecimal(rHex),
      g: this.hexToDecimal(gHex),
      b: this.hexToDecimal(bHex),
      a: 1
    };
  }

  /**
   * Parses and validates a single RGB componet string to a number
   * @param value color componet string between `"0"` - `"255"`
   */
  private parseRgbComponent(value: string): number {
    const rgbComponent = parseInt(value, 10);
    if (isNaN(rgbComponent) || rgbComponent < 0 || rgbComponent > 255) {
      throw this.InvalidColorError;
    }
    return rgbComponent;
  }

  /**
   * Parses and validates the alpha value to a number
   * @param value alpha channel float string between `"0"` and `"1"`
   */
  private parseAlpha(value: string): number {
    if (value === undefined) {
      return 1;
    }
    const alpha = parseFloat(value);
    if (isNaN(alpha) || alpha < 0 || alpha > 1) {
      throw this.InvalidColorError;
    }
    return alpha;
  }
}
