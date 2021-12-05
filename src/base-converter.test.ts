import { BaseConverter } from './base-converter';

let converter: BaseConverter;
beforeAll(() => {
  converter = new BaseConverter();
});

describe('convertFromBaseNToDecimal', () => {
  describe('When given a number in a base that is less than or equal to 10', () => {
    test('should convert it to decimal', () => {
      expect(converter.convertFromBaseNToDecimal('1101', 2)).toEqual(13);
      expect(converter.convertFromBaseNToDecimal('11011', 2)).toEqual(27);
      expect(converter.convertFromBaseNToDecimal('1210', 3)).toEqual(48);
    });
  });
  describe('When given a number in a base that is greater than 10', () => {
    test('should convert it to decimal', () => {
      expect(converter.convertFromBaseNToDecimal('1A1', 11)).toEqual(232);
      expect(converter.convertFromBaseNToDecimal('1B1', 14)).toEqual(351);
      expect(converter.convertFromBaseNToDecimal('ABC', 16)).toEqual(2748);
    });
  });
  describe('when given a number in base N with and integer and decimal part', () => {
    test('should convert it to a decimal number', () => {
      expect(converter.convertFromBaseNToDecimal('1101.10', 2)).toBeCloseTo(
        13.5
      );
    });
  });
  describe('when given an invalid number in base N', () => {
    test('should throw an error indicating that the number is not a string', () => {
      expect(() =>
        converter.convertFromBaseNToDecimal(1010 as unknown as string, 2)
      ).toThrowError('Number to convert must be a string');
    });
    test('should throw an error indicating that there is nore than one delimiter', () => {
      expect(() =>
        converter.convertFromBaseNToDecimal('1101.10.11', 2)
      ).toThrowError('Number contains more than one delimiter');
    });
    test('should throw an error indicating that the number is invalid', () => {
      expect(() => converter.convertFromBaseNToDecimal('123', 3)).toThrowError(
        'Invalid Number'
      );
      expect(() => converter.convertFromBaseNToDecimal('12@', 3)).toThrowError(
        'Invalid Number'
      );
    });
    test('should throw an error indicating the baseFrom must be a number', () => {
      expect(() =>
        converter.convertFromBaseNToDecimal('123', '5' as unknown as number)
      ).toThrowError('base from needs to be an integer');
    });
  });
});

describe('convertFromDecimaltoBaseN', () => {
  describe('when given a decimal number', () => {
    test('should convert it to a base N number', () => {
      expect(converter.convertFromDecimaltoBaseN(13, 2)).toEqual('1101');
      expect(converter.convertFromDecimaltoBaseN(27, 2)).toEqual('11011');
      expect(converter.convertFromDecimaltoBaseN(48, 3)).toEqual('1210');
      expect(converter.convertFromDecimaltoBaseN(232, 11)).toEqual('1A1');
      expect(converter.convertFromDecimaltoBaseN(351, 14)).toEqual('1B1');
      expect(converter.convertFromDecimaltoBaseN(2748, 16)).toEqual('ABC');
    });
  });
  describe('when given a decimal number is less than the base we want to convert', () => {
    test('should convert it to a base number and delete the zeros from the left', () => {
      expect(converter.convertFromDecimaltoBaseN(10, 16)).toEqual('A');
    });
  });

  describe('when given a decimal number with a decimal part', () => {
    test('should convert both the integer and the decial part with a given precision', () => {
      expect(converter.convertFromDecimaltoBaseN(10.8, 2)).toEqual('1010.11');
      expect(converter.convertFromDecimaltoBaseN(10.8, 8)).toEqual('12.63');
      expect(converter.convertFromDecimaltoBaseN(10.8, 16)).toEqual('A.CC');
    });
  });

  describe('when given invalid parameters to the method', () => {
    test('should throw an error indicating that the base needs to be an integer', () => {
      expect(() => converter.convertFromDecimaltoBaseN(10, 45.56)).toThrowError(
        'Base needs to be an integer'
      );
    });
    test('should throw an error that the precision needs to be an integer', () => {
      expect(() =>
        converter.convertFromDecimaltoBaseN(10.8, 12, 12.56)
      ).toThrowError('Precision needs to be an integer');
    });
    test('should throw an error indicating that the number to convert needs to be a number', () => {
      expect(() =>
        converter.convertFromDecimaltoBaseN('test' as unknown as number, 12, 2)
      ).toThrowError('Number to convert needs to be a number');
    });
  });
});

describe('convert()', () => {
  describe('when given a number in base N and a number in base M', () => {
    test('should convert the number between these bases', () => {
      expect(converter.convert('10', { fromBase: 10, toBase: 10 })).toEqual(
        '10'
      );
      expect(converter.convert('10', { fromBase: 10, toBase: 2 })).toEqual(
        '1010'
      );
      expect(converter.convert('10', { fromBase: 2, toBase: 10 })).toEqual('2');
      expect(converter.convert('10', { fromBase: 2, toBase: 5 })).toEqual('2');
      expect(converter.convert('10', { fromBase: 5, toBase: 2 })).toEqual(
        '101'
      );

      expect(converter.convert('10.5', { fromBase: 10, toBase: 10 })).toEqual(
        '10.50'
      );
      expect(converter.convert('10.5', { fromBase: 10, toBase: 2 })).toEqual(
        '1010.10'
      );

      expect(converter.convert('10.11', { fromBase: 2, toBase: 10 })).toEqual(
        '2.75'
      );
      expect(converter.convert('10.11', { fromBase: 2, toBase: 5 })).toEqual(
        '2.33'
      );
      expect(converter.convert('10.11', { fromBase: 5, toBase: 2 })).toEqual(
        '101.00'
      );
    });
  });
});
